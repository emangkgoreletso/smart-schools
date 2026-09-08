using SSS.Backend.Shared.Enums;

namespace SSS.Backend.Models;

public class Staff
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public Guid SchoolId { get; set; }

    public string EmployeeNumber { get; set; } = string.Empty;

    public string Department { get; set; } = string.Empty;

    public UserRole Role { get; set; }

    public DateTime HireDate { get; set; }

    public bool IsActive { get; set; } = true;

    // Navigation
    public User? User { get; set; }

    public School? School { get; set; }
}