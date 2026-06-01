namespace SSS.Backend.Models
{
    public class ClassSubject
    {
        public Guid Id { get; set; }

        public Guid ClassId { get; set; }

        public Guid SubjectId { get; set; }

        public Guid TeacherId { get; set; }
    }
}