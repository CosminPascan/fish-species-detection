using server.Models;

namespace server.Services;

public interface IDetectionServices
{
    void CreateDetection(Detection detection);

    Detection GetDetectionBySpeciesAndHabitatId(string species, int habitatId);

    Detection GetDetectionById(int id);

    void UpdateHighestConfidence(int id, double HighestConfidence);
}