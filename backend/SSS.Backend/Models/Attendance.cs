using SSS.Backend.Shared.Enums;

namespace SSS.Backend.Models;

public class Attendance
{
    public Guid Id { get; set; }

    public Guid StudentId { get; set; }

    public Guid ClassId { get; set; }

    public DateTime Date { get; set; }

    public AttendanceStatus Status { get; set; }

    public string? Remarks { get; set; }

    // Navigation
    public Student? Student { get; set; }

    public Class? Class { get; set; }
}