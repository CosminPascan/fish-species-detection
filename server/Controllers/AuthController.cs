using Microsoft.AspNetCore.Mvc;
using server.Dtos.User;
using server.Models;
using server.Services;

namespace server.Controllers;

[Route("api")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IUserServices _userServices;
    private readonly ITokenServices _tokenServices;

    public AuthController(IUserServices userServices, ITokenServices tokenServices)
    {
        _userServices = userServices;
        _tokenServices = tokenServices;
    }

    [HttpPost("register")]
    public IActionResult Register(RegisterDto dto)
    {   
        var user = new User
        {   
            Username = dto.Username,
            Email = dto.Email,
            Password = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };

        _userServices.CreateUser(user);

        return Created($"/api/register/{user.Id}", user);
    }

    [HttpPost("login")]
    public IActionResult Login(LoginDto dto)
    {
        var user = _userServices.GetUserByEmail(dto.Email);

        if (user == null) 
            return NotFound(new { message = "Invalid email!" });

        if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            return NotFound(new { message = "Invalid password!" });

        var accessToken = _tokenServices.GenerateAccessToken(user);
        var refreshToken = _tokenServices.GenerateRefreshToken();
        
        _tokenServices.CreateRefreshToken(refreshToken);
        _userServices.AddRefreshTokenToUser(refreshToken, user.Id);
        SetRefreshToken(refreshToken);
        
        return Ok(new { accessToken });
    }

    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken()
    {
        var refreshToken = Request.Cookies["refresh-token"];
        
        if (refreshToken == null) 
            return Unauthorized(new { message = "Refresh token has expired! Please login again!" });

        var user = await _userServices.GetUserByRefreshToken(refreshToken);

        var accessToken = _tokenServices.GenerateAccessToken(user);
        var newRefreshToken = _tokenServices.GenerateRefreshToken();

        _tokenServices.CreateRefreshToken(newRefreshToken);
        _userServices.AddRefreshTokenToUser(newRefreshToken, user.Id);
        SetRefreshToken(newRefreshToken);

        return Ok(new { accessToken });
    }

    private void SetRefreshToken(RefreshToken refreshToken)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Expires = refreshToken.Expires
        };

        Response.Cookies.Append("refresh-token", refreshToken.Token, cookieOptions);
    }
}