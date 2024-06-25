using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class Detection
{
    [Key]
    public int Id { get; set; }

    [Required]
    public double Confidence { get; set; }

    [Required]
    public double Length { get; set; }

    [Required]
    public double Height { get; set; }

    [ForeignKey("FishId")]
    public virtual Fish Fish { get; set; }

    
    [ForeignKey("HabitatId")]
    public virtual Habitat Habitat { get; set; }
}