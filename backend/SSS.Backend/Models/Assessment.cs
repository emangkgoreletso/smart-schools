using SSS.Backend.Shared.Enums;

namespace SSS.Backend.Models;

public class Assessment
{
    public Guid Id { get; set; }

    public Guid SubjectId { get; set; }

    public Guid ClassId { get; set; }

    public Guid TeacherId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public AssessmentType Type { get; set; }

    public int TotalMarks { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime DueDate { get; set; }

    public bool IsPublished { get; set; } = false;

    // Navigation
    public Subject? Subject { get; set; }

    public Class? Class { get; set; }

    public Teacher? Teacher { get; set; }

    public ICollection<Mark>? Marks { get; set; }

    public ICollection<Submission>? Submissions { get; set; }
}