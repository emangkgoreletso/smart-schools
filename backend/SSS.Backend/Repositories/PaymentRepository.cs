using SSS.Backend.Persistence.Context;

namespace SSS.Backend.Infrastructure.Repositories;

public class PaymentRepository
{
    private readonly ApplicationDbContext _context;

    public PaymentRepository(ApplicationDbContext context)
    {
        _context = context;
    }
}