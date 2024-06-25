namespace server.Dtos.Detection;

public class DetectionResponseDto
{
    public string Species { get; set; }

    public string Description { get; set; }

    public double Confidence { get; set; }

    public double Length { get; set; }

    public double Height { get; set; }
}