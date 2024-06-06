using server.Dtos.Habitat;
using server.Models;

namespace server.Mappers;

public static class HabitatMappers
{   
    public static CreateHabitatDto ToCreateHabitatDto(this Habitat habitat)
    {
        return new CreateHabitatDto
        {
            Name = habitat.Name,
            Description = habitat.Description
        };
    }

    public static HabitatResponseDto ToHabitatResponseDto(this Habitat habitat)
    {
        return new HabitatResponseDto
        {
            Name = habitat.Name, 
            Description = habitat.Description,
            Detections = habitat.Detections.Select(d => d.ToDetectionResponseDto()).ToList()
        };
    }
}