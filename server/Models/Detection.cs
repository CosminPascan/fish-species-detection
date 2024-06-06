using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class Detection
{
    [Key]
    public int Id { get; set; }

    public double HighestConfidence { get; set; }

    [ForeignKey("FishId")]
    public virtual Fish Fish { get; set; }

    
    [ForeignKey("HabitatId")]
    public virtual Habitat Habitat { get; set; }
}