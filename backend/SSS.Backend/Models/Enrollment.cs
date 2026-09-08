namespace SSS.Backend.Models;

public class Enrollment
{
    public Guid Id { get; set; }

    public Guid StudentId { get; set; }

    public Guid SubjectId { get; set; }

    public int AcademicYear { get; set; }

    public string Term { get; set; } = string.Empty;

    public DateTime EnrolledAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public Student? Student { get; set; }

    public Subject? Subject { get; set; }
}