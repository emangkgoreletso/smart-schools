namespace SSS.Backend.Models;

public class Submission
{
    public Guid Id { get; set; }

    public Guid AssessmentId { get; set; }

    public Guid StudentId { get; set; }

    public string FileUrl { get; set; } = string.Empty;

    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;

    public bool IsLate { get; set; }

    // Navigation
    public Assessment? Assessment { get; set; }

    public Student? Student { get; set; }
}