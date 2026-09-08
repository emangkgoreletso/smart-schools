using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SSS.Backend.Persistence.Context;
using SSS.Backend.Models;

namespace SSS.Backend.Controllers;

[ApiController]
[Route("api/submissions")]
public class SubmissionsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SubmissionsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // POST: student submits work
    [HttpPost]
    public async Task<IActionResult> Submit(Submission submission)
    {
        submission.SubmittedAt = DateTime.UtcNow;

        _context.Submissions.Add(submission);
        await _context.SaveChangesAsync();

        return Ok(submission);
    }

    // GET: submissions for assessment
    [HttpGet("assessment/{assessmentId}")]
    public async Task<IActionResult> GetByAssessment(Guid assessmentId)
    {
        var data = await _context.Submissions
            .Where(s => s.AssessmentId == assessmentId)
            .ToListAsync();

        return Ok(data);
    }
}