namespace SSS.Backend.Models;

public class Class
{
    public Guid Id { get; set; }

    public Guid SchoolId { get; set; }

    public Guid ClassTeacherId { get; set; }

    public string Name { get; set; } = string.Empty;

    public string GradeLevel { get; set; } = string.Empty;

    public int AcademicYear { get; set; }

    public bool IsActive { get; set; } = true;

    // Navigation
    public School? School { get; set; }

    public Teacher? ClassTeacher { get; set; }

    public ICollection<Student>? Students { get; set; }

    public ICollection<ClassSubject>? ClassSubjects { get; set; }

    public ICollection<Assessment>? Assessments { get; set; }

    public ICollection<Attendance>? AttendanceRecords { get; set; }

    public ICollection<Fee>? Fees { get; set; }
}