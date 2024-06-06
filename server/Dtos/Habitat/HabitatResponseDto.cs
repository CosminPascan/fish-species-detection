using server.Dtos.Detection;

namespace server.Dtos.Habitat;

public class HabitatResponseDto
{
    public string Name { get; set; }

    public string Description { get; set; }

    public List<DetectionResponseDto> Detections { get; set; }
}