using server.Models;

namespace server.Services;

public interface ITokenServices
{
    string GenerateAccessToken(User user);

    RefreshToken GenerateRefreshToken();

    void CreateRefreshToken(RefreshToken refreshToken);
}