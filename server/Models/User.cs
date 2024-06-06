using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class User 
{   
    [Key]
    public int Id { get; set; }

    [Required]
    public string Username { get; set; }

    [Required, StringLength(50)]
    public string Email { get; set; }
    
    [Required]
    public string Password { get; set; }

    [ForeignKey("Token")]
    public virtual RefreshToken RefreshToken { get; set; }
}