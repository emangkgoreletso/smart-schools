namespace SSS.Backend.Models;

public class Session
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public string IpAddress { get; set; } = string.Empty;

    public string Device { get; set; } = string.Empty;

    public DateTime LoginTime { get; set; }

    public DateTime? LogoutTime { get; set; }

    public bool IsActive { get; set; }

    // Navigation
    public User? User { get; set; }
}