using server.Data;
using server.Models;

namespace server.Services;

public class DetectionServices : IDetectionServices
{
    private readonly AppDbContext _context;

    public DetectionServices(AppDbContext context)
    {
        _context = context;
    }

    public void CreateDetection(Detection detection)
    {
        _context.Detections.Add(detection);
        _context.SaveChanges();
    }

    public Detection GetDetectionBySpeciesAndHabitatId(string species, int habitatId)
    {
        return _context.Detections.FirstOrDefault(d => 
            d.Fish.Species == species && d.Habitat.Id == habitatId);
    }

    public Detection GetDetectionById(int id)
    {
        return _context.Detections.FirstOrDefault(d => d.Id == id);
    }

    public void UpdateValue(int id, double value, string property)
    {
        var detection = GetDetectionById(id);

        if (property == "confidence") {
            detection.Confidence = value;
        } else if (property == "width") {
            detection.Width = value;
        } else if (property == "height") {
            detection.Height = value;
        }

        _context.SaveChanges();
    }
}