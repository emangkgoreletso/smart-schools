using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AssignmentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AssignmentsController(AppDbContext context)
        {
            _context = context;
        }

        // Get all assignments
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var assignments = await _context.Assignments
                .Include(a => a.Submissions)
                .ToListAsync();
            return Ok(assignments);
        }

        // Get assignment by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var assignment = await _context.Assignments
                .Include(a => a.Submissions)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (assignment == null)
                return NotFound();

            return Ok(assignment);
        }

        // Create new assignment
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Assignment assignment)
        {
            _context.Assignments.Add(assignment);
            await _context.SaveChangesAsync();
            return Ok(assignment);
        }

        // Delete assignment
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var assignment = await _context.Assignments.FindAsync(id);
            if (assignment == null)
                return NotFound();

            _context.Assignments.Remove(assignment);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
