namespace SSS.Backend.Models;

public class Fee
{
    public Guid Id { get; set; }

    public Guid SchoolId { get; set; }

    public Guid ClassId { get; set; }

    public string FeeName { get; set; } = string.Empty;

    public decimal Amount { get; set; }

    public int AcademicYear { get; set; }

    public string Term { get; set; } = string.Empty;

    public bool IsActive { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public School? School { get; set; }

    public Class? Class { get; set; }

    public ICollection<StudentFee>? StudentFees { get; set; }
}