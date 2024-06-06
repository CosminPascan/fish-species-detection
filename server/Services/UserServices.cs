using server.Data;
using server.Models;

namespace server.Services;

public class UserServices : IUserServices
{
    private readonly AppDbContext _context;

    public UserServices(AppDbContext context)
    {
        _context = context;
    }


    public void CreateUser(User user) 
    {
        _context.Users.Add(user);
        _context.SaveChanges();
    }

    public User GetUserById(int id)
    {
        return _context.Users.FirstOrDefault(u => u.Id == id);
    }

    public User GetUserByEmail(string email)
    {
        return _context.Users.FirstOrDefault(u => u.Email == email);
    }

    public User GetUserByRefreshToken(string token)
    {
        return _context.Users.FirstOrDefault(u => u.RefreshToken.Token.Equals(token));
    }

    public void AddRefreshTokenToUser(RefreshToken refreshToken, int id)
    {
        var user = _context.Users.FirstOrDefault(u => u.Id == id);
        user.RefreshToken = refreshToken;
        _context.SaveChanges();
    }
}