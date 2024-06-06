using server.Data;
using server.Models;

namespace server.Services;

public class FishServices : IFishServices
{
    private readonly AppDbContext _context;

    public FishServices(AppDbContext context)
    {
        _context = context;
    }

    public void CreateFish(Fish fish)
    {
        _context.Fish.Add(fish);
        _context.SaveChanges();
    }

    public Fish GetFishBySpecies(string species)
    {
        return _context.Fish.FirstOrDefault(f => f.Species == species);
    }
}