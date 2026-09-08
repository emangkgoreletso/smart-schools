namespace SSS.Backend.Models;

public class Teacher
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public Guid SchoolId { get; set; }

    public string EmployeeNumber { get; set; } = string.Empty;

    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public DateTime HireDate { get; set; }

    public bool IsActive { get; set; } = true;

    // Navigation
    public User? User { get; set; }

    public School? School { get; set; }

    public ICollection<Class>? Classes { get; set; }

    public ICollection<ClassSubject>? ClassSubjects { get; set; }

    public ICollection<Assessment>? Assessments { get; set; }
}