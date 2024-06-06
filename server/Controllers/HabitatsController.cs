using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.Habitat;
using server.Mappers;
using server.Models;
using server.Services;

namespace server.Controllers;

[Route("api/habitats")]
[ApiController]
public class HabitatsController : ControllerBase
{
    private readonly IHabitatServices _habitatServices;
    private readonly IUserServices _userServices;

    public HabitatsController(IHabitatServices habitatServices, IUserServices userServices)
    {
        _habitatServices = habitatServices;
        _userServices = userServices;
    }

    [HttpPost("create"), Authorize]
    public IActionResult Create(CreateHabitatDto dto) 
    {   
        var h = _habitatServices.GetHabitatByName(dto.Name);

        if (h != null)
            return BadRequest(new { message = $"Habitat {h.Name} already exists!" });

        var id = Convert.ToInt32(HttpContext.User.FindFirst("id").Value);
        var user = _userServices.GetUserById(id);

        var habitat = new Habitat 
        {
            Name = dto.Name,
            Description = dto.Description,
            User = user
        };

        _habitatServices.CreateHabitat(habitat);

        return Created($"/api/habitats/create/{habitat.Id}", habitat.ToCreateHabitatDto());
    }

    [HttpGet("all"), Authorize]
    public IActionResult GetAll() 
    {   
        var id = Convert.ToInt32(HttpContext.User.FindFirst("id").Value);
        
        var habitats = _habitatServices.GetHabitatsByUserId(id).Select(h => h.ToHabitatResponseDto()).ToList();

        return Ok(new { habitats });
    }
}