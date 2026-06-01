namespace SSS.Backend.Application.DTOs;

public class AssessmentDTO
{
    public Guid Id { get; set; }
    //public Guid SubjectId { get; set; }
    public Guid ClassId { get; set; }
    public Guid TeacherId { get; set; }
    public string Title { get; set; }
    public AssessmentType Type { get; set; }
    public int TotalMarks { get; set; }
    public DateTime DueDate { get; set; }
}