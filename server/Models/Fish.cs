using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class Fish
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Species { get; set; }
    
    [Required]
    public string Description { get; set; }
}