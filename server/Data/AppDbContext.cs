using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }

    public DbSet<RefreshToken> RefreshTokens { get; set; }

    public DbSet<Fish> Fish { get; set; }

    public DbSet<Habitat> Habitats { get; set; }

    public DbSet<Detection> Detections { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseLazyLoadingProxies();
    }
}