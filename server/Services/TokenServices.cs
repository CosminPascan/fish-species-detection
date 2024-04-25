using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using server.Data;
using server.Models;

namespace server.Services;

public class TokenServices : ITokenServices
{
    private readonly IConfiguration _configuration;
    private readonly AppDbContext _context;

    public TokenServices(IConfiguration configuration, AppDbContext context)
    {
        _configuration = configuration;
        _context = context;   
    }

    public string GenerateAccessToken(User user)
    {   
        var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
        var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
        var securityToken = new JwtSecurityToken(
            claims: new List<Claim> {
                new Claim("id", user.Id.ToString()),
                new Claim("email", user.Email)
            },
            expires: DateTime.Now.AddMinutes(10),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(securityToken);
    }

    public RefreshToken GenerateRefreshToken()
    {
        var refreshToken = new RefreshToken
        {
            Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
            Created = DateTime.Now,
            Expires = DateTime.Now.AddDays(7)
        };

        return refreshToken;
    } 

    public void CreateRefreshToken(RefreshToken refreshToken)
    {
        _context.RefreshTokens.Add(refreshToken);
        _context.SaveChanges();
    }
}