using server.Dtos.Detection;
using server.Models;

namespace server.Mappers;

public static class DetectionMappers
{
    public static DetectionResponseDto ToDetectionResponseDto(this Detection detection)
    {
        return new DetectionResponseDto
        {
            Species = detection.Fish.Species,
            Description = detection.Fish.Description,
            HighestConfidence = detection.HighestConfidence
        };
    }
}