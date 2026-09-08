namespace SSS.Backend.Models;

public class School
{
    public Guid Id { get; set; }

    public string SchoolName { get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;

    public string City { get; set; } = string.Empty;

    public string Country { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string? LogoUrl { get; set; }

    public bool IsActive { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation Properties
    public ICollection<User>? Users { get; set; }
    public ICollection<Student>? Students { get; set; }
    public ICollection<Teacher>? Teachers { get; set; }
    public ICollection<Staff>? StaffMembers { get; set; }
    public ICollection<Class>? Classes { get; set; }
    public ICollection<Fee>? Fees { get; set; }
    public ICollection<Notice>? Notices { get; set; }
}