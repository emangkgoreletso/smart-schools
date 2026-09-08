using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SSS.Backend.Persistence.Context;
using SSS.Backend.Application.DTOs;
using SSS.Backend.Models;
using SSS.Backend.Shared.Enums;

namespace SSS.Backend.Controllers;

[ApiController]
[Route("api/assessments")]
public class AssessmentsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AssessmentsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // =========================
    // GET ASSESSMENTS BY TYPE
    // =========================
    [HttpGet("type/{type}")]
    public async Task<IActionResult> GetByType(AssessmentType type)
    {
        var assessments = await _context.Assessments
            .Where(a => a.Type == type)
            .Select(a => new AssessmentDTO
            {
                Id = a.Id,
                Title = a.Title,
                ClassId = a.ClassId,
                DueDate = a.DueDate,

                // TEMP FIX (until proper submissions service exists)
                Submissions = _context.Submissions
                    .Count(s => s.AssessmentId == a.Id)
            })
            .ToListAsync();

        return Ok(assessments);
    }

    // =========================
    // CREATE ASSESSMENT
    // =========================
    [HttpPost]
    public async Task<IActionResult> CreateAssessment([FromBody] CreateAssessmentDTO dto)
    {
        if (dto == null)
        {
            return BadRequest("Invalid assessment data.");
        }

        var assessment = new Assessment
        {
            Id = Guid.NewGuid(),
            SubjectId = dto.SubjectId,
            ClassId = dto.ClassId,
            TeacherId = dto.TeacherId,
            Title = dto.Title,
            Type = dto.Type,
            TotalMarks = dto.TotalMarks,
            DueDate = dto.DueDate,
            CreatedAt = DateTime.UtcNow
        };

        _context.Assessments.Add(assessment);
        await _context.SaveChangesAsync();

        return Ok(new AssessmentDTO
        {
            Id = assessment.Id,
            Title = assessment.Title,
            ClassId = assessment.ClassId,
            DueDate = assessment.DueDate,
            Submissions = 0
        });
    }
}