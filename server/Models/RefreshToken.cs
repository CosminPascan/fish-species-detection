using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class RefreshToken
{
    [Key]
    public string Token { get; set; } = string.Empty;

    public DateTime Created { get; set; }

    public DateTime Expires { get; set; }
}