using SSS.Backend.Shared.Enums;

namespace SSS.Backend.Application.DTOs;

public class CreateAssessmentDTO
{
    public Guid SubjectId { get; set; }

    public Guid ClassId { get; set; }

    public Guid TeacherId { get; set; }

    public string Title { get; set; } = string.Empty;

    public AssessmentType Type { get; set; }

    public int TotalMarks { get; set; }

    public DateTime DueDate { get; set; }
}