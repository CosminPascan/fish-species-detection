using server.Models;

namespace server.Services;

public interface IFishServices
{
    void CreateFish(Fish fish);

    Fish GetFishBySpecies(string species);
}