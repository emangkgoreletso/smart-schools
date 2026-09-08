namespace SSS.Backend.Models;

public class Subject
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Code { get; set; } = string.Empty;

    public string? Description { get; set; }

    public bool IsActive { get; set; } = true;

    // Navigation
    public ICollection<ClassSubject>? ClassSubjects { get; set; }

    public ICollection<Assessment>? Assessments { get; set; }

    public ICollection<Enrollment>? Enrollments { get; set; }
}