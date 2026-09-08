using SSS.Backend.Persistence.Context;

namespace SSS.Backend.Infrastructure.Repositories;

public class StudentRepository
{
    private readonly ApplicationDbContext _context;

    public StudentRepository(ApplicationDbContext context)
    {
        _context = context;
    }
}