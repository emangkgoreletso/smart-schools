namespace SSS.Backend.Models;

public class Mark
{
    public Guid Id { get; set; }

    public Guid AssessmentId { get; set; }

    public Guid StudentId { get; set; }

    public decimal Score { get; set; }

    public string? Grade { get; set; }

    public string? Remarks { get; set; }

    public DateTime MarkedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public Assessment? Assessment { get; set; }

    public Student? Student { get; set; }
}