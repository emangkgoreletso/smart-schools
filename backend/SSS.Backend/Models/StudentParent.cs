namespace SSS.Backend.Models
{
    public class StudentParent
    {
        public Guid Id { get; set; }

        public Guid StudentId { get; set; }

        public Guid ParentId { get; set; }

        public string Relationship { get; set; }
    }
}