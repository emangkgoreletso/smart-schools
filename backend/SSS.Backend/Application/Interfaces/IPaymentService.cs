using SSS.Backend.Application.DTOs;

namespace SSS.Backend.Application.Interfaces;

public interface IPaymentService
{
    Task<IEnumerable<PaymentDTO>> GetPayments();
}