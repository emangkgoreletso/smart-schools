namespace SSS.Backend.Models;

public class Subscription
{
    public Guid Id { get; set; }

    public Guid SchoolId { get; set; }

    public string PlanName { get; set; } = string.Empty;

    public decimal MonthlyAmount { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public bool IsActive { get; set; }

    // Navigation
    public School? School { get; set; }
}