using SSS.Backend.Shared.Enums;

namespace SSS.Backend.Models;

public class User
{
    public Guid Id { get; set; }

    public Guid SchoolId { get; set; }

    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public UserRole Role { get; set; }

    public bool IsActive { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public School? School { get; set; }

    public ICollection<Session>? Sessions { get; set; }

    public ICollection<RefreshToken>? RefreshTokens { get; set; }

    public ICollection<AuditLog>? AuditLogs { get; set; }
}