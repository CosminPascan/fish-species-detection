using Microsoft.AspNetCore.Mvc;
using server.Dtos.Fish;
using server.Models;
using server.Services;

namespace server.Controllers;

[Route("api/fish")]
[ApiController]
public class FishController : ControllerBase
{
    private readonly IFishServices _fishServices;

    public FishController(IFishServices fishServices)
    {
        _fishServices = fishServices;
    }

    [HttpPost("create")]
    public IActionResult Create(FishDto dto) 
    {   
        var f = _fishServices.GetFishBySpecies(dto.Species);

        if (f != null)
            return BadRequest(new { message = $"Species {f.Species} already exists!" });

        var fish = new Fish
        {
            Species = dto.Species,
            Description = dto.Description
        };

        _fishServices.CreateFish(fish);

        return Created($"/api/fish/create/{fish.Id}", fish);
    }
}