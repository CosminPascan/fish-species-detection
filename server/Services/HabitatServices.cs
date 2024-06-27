using server.Data;
using server.Models;
using SQLitePCL;

namespace server.Services;

public class HabitatServices : IHabitatServices
{
    private readonly AppDbContext _context;

    public HabitatServices(AppDbContext context)
    {
        _context = context;
    }

    public void CreateHabitat(Habitat habitat)
    {
        _context.Habitats.Add(habitat);
        _context.SaveChanges();
    }
    
    public Habitat GetHabitatByName(string name)
    {
        return _context.Habitats.FirstOrDefault(h => h.Name == name);
    }

    public List<Habitat> GetHabitatsByUserId(int userId)
    {
        return _context.Habitats.Where(h => h.User.Id == userId).ToList();
    }

    public void DeleteHabitatByName(string name)
    {
        Habitat h = _context.Habitats.Where(h => h.Name == name).FirstOrDefault();
        if (h != null) {
            _context.Habitats.Remove(h);
            _context.SaveChanges();
        }  
    }
}