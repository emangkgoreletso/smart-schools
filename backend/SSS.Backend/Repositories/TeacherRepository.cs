using SSS.Backend.Persistence.Context;

namespace SSS.Backend.Infrastructure.Repositories;

public class TeacherRepository
{
    private readonly ApplicationDbContext _context;

    public TeacherRepository(ApplicationDbContext context)
    {
        _context = context;
    }
}