using server.Models;

namespace server.Services;

public interface IHabitatServices
{
    void CreateHabitat(Habitat habitat);

    Habitat GetHabitatByName(string name);

    List<Habitat> GetHabitatsByUserId(int userId);

    void DeleteHabitatByName(string name);
}