namespace server.Dtos.Detection;

public class CreateDetectionDto
{
    public string Species { get; set; }

    public double HighestConfidence { get; set; }

    public string HabitatName { get; set; }
}