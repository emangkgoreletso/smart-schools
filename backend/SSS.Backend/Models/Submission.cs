namespace SSS.Backend.Models;

public class Submission
{
    public Guid Id { get; set; }

    public Guid AssessmentId { get; set; }
    public Assessment Assessment { get; set; } = null!;

    public Guid StudentId { get; set; }
    public Student Student { get; set; } = null!;

    public string FileName { get; set; } = string.Empty;

    public DateTime SubmittedAt { get; set; }

    public double? Grade { get; set; }

    public string? Feedback { get; set; }
}