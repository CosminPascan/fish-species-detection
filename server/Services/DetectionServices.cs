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

    public void UpdateHighestConfidence(int id, double highestConfidence)
    {
        var detection = GetDetectionById(id);
        detection.HighestConfidence = highestConfidence;
        _context.SaveChanges();
    }
}