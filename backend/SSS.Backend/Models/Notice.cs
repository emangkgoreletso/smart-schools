namespace SSS.Backend.Models;

public class Notice
{
    public Guid Id { get; set; }

    public Guid SchoolId { get; set; }

    public Guid CreatedByUserId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Message { get; set; } = string.Empty;

    public string Audience { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? ExpiryDate { get; set; }

    // Navigation
    public School? School { get; set; }

    public User? CreatedByUser { get; set; }
}