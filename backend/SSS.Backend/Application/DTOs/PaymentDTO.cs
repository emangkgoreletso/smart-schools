namespace SSS.Backend.Application.DTOs;

public class PaymentDTO
{
    public Guid Id { get; set; }
    public Guid StudentId { get; set; }
    public decimal Amount { get; set; }
}