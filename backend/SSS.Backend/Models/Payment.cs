using SSS.Backend.Shared.Enums;

namespace SSS.Backend.Models;

public class Payment
{
    public Guid Id { get; set; }

    public Guid StudentId { get; set; }

    public Guid StudentFeeId { get; set; }

    public decimal Amount { get; set; }

    public string PaymentMethod { get; set; } = string.Empty;

    public string ReceiptNumber { get; set; } = string.Empty;

    public PaymentStatus Status { get; set; }

    public DateTime PaymentDate { get; set; } = DateTime.UtcNow;

    // Navigation
    public Student? Student { get; set; }

    public StudentFee? StudentFee { get; set; }

    public ICollection<PaymentTransaction>? Transactions { get; set; }
}