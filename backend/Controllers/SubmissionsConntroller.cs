using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubmissionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SubmissionsController(AppDbContext context)
        {
            _context = context;
        }

        // Get all submissions
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var submissions = await _context.Submissions
                .Include(s => s.Assignment)
                .ToListAsync();
            return Ok(submissions);
        }

        // Get submissions by student
        [HttpGet("student/{studentId}")]
        public async Task<IActionResult> GetByStudent(int studentId)
        {
            var submissions = await _context.Submissions
                .Where(s => s.StudentId == studentId)
                .Include(s => s.Assignment)
                .ToListAsync();
            return Ok(submissions);
        }

        // Create a new submission
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Submission submission)
        {
            _context.Submissions.Add(submission);
            await _context.SaveChangesAsync();
            return Ok(submission);
        }

        // Update submission grade/status
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Submission updated)
        {
            var submission = await _context.Submissions.FindAsync(id);
            if (submission == null)
                return NotFound();

            submission.Status = updated.Status;
            submission.Grade = updated.Grade;
            await _context.SaveChangesAsync();

            return Ok(submission);
        }
    }
}
