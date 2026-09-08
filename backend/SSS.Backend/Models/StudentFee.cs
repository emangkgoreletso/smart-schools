namespace SSS.Backend.Models;

public class StudentFee
{
    public Guid Id { get; set; }

    public Guid StudentId { get; set; }

    public Guid FeeId { get; set; }

    public decimal AmountDue { get; set; }

    public decimal AmountPaid { get; set; }

    public decimal Balance { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public Student? Student { get; set; }

    public Fee? Fee { get; set; }

    public ICollection<Payment>? Payments { get; set; }
}