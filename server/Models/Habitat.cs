using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class Habitat
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public string Description { get; set; }
    
    [ForeignKey("UserId")]
    public virtual User User { get; set; }

    public virtual List<Detection> Detections { get; set; }
}