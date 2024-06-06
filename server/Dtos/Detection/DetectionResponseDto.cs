namespace server.Dtos.Detection;

public class DetectionResponseDto
{
    public string Species { get; set; }

    public string Description { get; set; }

    public double HighestConfidence { get; set; }
}