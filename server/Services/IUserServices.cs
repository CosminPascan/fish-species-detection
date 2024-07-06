using server.Models;

namespace server.Services;

public interface IUserServices
{
    void CreateUser(User user);

    User GetUserById(int id);

    User GetUserByEmail(string email); 

    Task<User> GetUserByRefreshToken(string token);

    void AddRefreshTokenToUser(RefreshToken refreshToken, int id);
}