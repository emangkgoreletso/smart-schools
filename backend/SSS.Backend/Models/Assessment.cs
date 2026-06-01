using SSS.Backend.Shared.Enums;

namespace SSS.Backend.Models;

public class Assessment
{
    public Guid Id { get; set; }

    public Guid SubjectId { get; set; }

    public Guid ClassId { get; set; }

    public Guid TeacherId { get; set; }

    public string Title { get; set; }

    public AssessmentType Type { get; set; }

    public int TotalMarks { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime DueDate { get; set; }   // ✅ ADD THIS (you need it)

    // optional later
    public ICollection<Submission>? Submissions { get; set; }
}