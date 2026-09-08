namespace SSS.Backend.Models;

public class Student
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public Guid SchoolId { get; set; }

    public Guid ClassId { get; set; }

    public string StudentNumber { get; set; } = string.Empty;

    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string Gender { get; set; } = string.Empty;

    public DateTime DateOfBirth { get; set; }

    public DateTime AdmissionDate { get; set; }

    public bool IsActive { get; set; } = true;

    // Navigation
    public User? User { get; set; }

    public School? School { get; set; }

    public Class? Class { get; set; }

    public ICollection<StudentParent>? StudentParents { get; set; }

    public ICollection<Mark>? Marks { get; set; }

    public ICollection<Attendance>? AttendanceRecords { get; set; }

    public ICollection<StudentFee>? StudentFees { get; set; }

    public ICollection<Payment>? Payments { get; set; }

    public ICollection<Enrollment>? Enrollments { get; set; }

    public ICollection<Submission>? Submissions { get; set; }
}