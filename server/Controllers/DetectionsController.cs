using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.Detection;
using server.Mappers;
using server.Models;
using server.Services;

namespace server.Controllers;

[Route("api/detections")]
[ApiController]
public class DetectionController : ControllerBase
{   
    private readonly IDetectionServices _detectionServices;
    private readonly IFishServices _fishServices;
    private readonly IHabitatServices _habitatServices;

    public DetectionController(IDetectionServices detectionServices, IFishServices fishServices, IHabitatServices habitatServices)
    {   
        _detectionServices = detectionServices;
        _fishServices = fishServices;
        _habitatServices = habitatServices;
    }

    [HttpPost("create"), Authorize]
    public IActionResult Create(CreateDetectionDto dto) 
    {   
        var fish = _fishServices.GetFishBySpecies(dto.Species);

        if (fish == null)
            return BadRequest(new { message = $"Species {dto.Species} doesn't exist!" });

        var habitat = _habitatServices.GetHabitatByName(dto.HabitatName);

        if (habitat == null) {
            return BadRequest(new { message = $"Habitat {dto.HabitatName} doesn't exist!" });
        }

        var d = _detectionServices.GetDetectionBySpeciesAndHabitatId(fish.Species, habitat.Id);

        if (d == null) {
            var detection = new Detection
            {   
                HighestConfidence = dto.HighestConfidence,
                Fish = fish,
                Habitat = habitat
            };

            _detectionServices.CreateDetection(detection);

            return Created($"/api/detections/{detection.Id}", detection.ToDetectionResponseDto());
        }

        if (d.HighestConfidence > dto.HighestConfidence)
            return Ok("A better detection already exists!");

        _detectionServices.UpdateHighestConfidence(d.Id, dto.HighestConfidence);
        return Ok("Detection has been updated!");
    }
}