namespace SSS.Backend.Models;

public class PaymentTransaction
{
    public Guid Id { get; set; }

    public Guid PaymentId { get; set; }

    public string TransactionReference { get; set; } = string.Empty;

    public string Provider { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public string? ResponseMessage { get; set; }

    public DateTime TransactionDate { get; set; } = DateTime.UtcNow;

    // Navigation
    public Payment? Payment { get; set; }
}