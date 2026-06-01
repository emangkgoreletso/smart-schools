using SSS.Backend.Application.DTOs;
using SSS.Backend.Application.Interfaces;

namespace SSS.Backend.Application.Services;

public class PaymentService : IPaymentService
{
    public Task<IEnumerable<PaymentDTO>> GetPayments()
    {
        return Task.FromResult<IEnumerable<PaymentDTO>>(new List<PaymentDTO>());
    }
}