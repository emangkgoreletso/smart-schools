namespace SSS.Backend.Models;

public class ClassSubject
{
    public Guid Id { get; set; }

    public Guid ClassId { get; set; }

    public Guid SubjectId { get; set; }

    public Guid TeacherId { get; set; }

    // Navigation
    public Class? Class { get; set; }

    public Subject? Subject { get; set; }

    public Teacher? Teacher { get; set; }
}