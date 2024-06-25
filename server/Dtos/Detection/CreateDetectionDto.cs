namespace server.Dtos.Detection;

public class CreateDetectionDto
{
    public string Species { get; set; }

    public double Confidence { get; set; }

    public double Length { get; set; }

    public double Height { get; set; }

    public string HabitatName { get; set; }
}