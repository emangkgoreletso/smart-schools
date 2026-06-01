namespace SSS.Backend.Models
{
    public class Class
    {
        public Guid Id { get; set; }

        public Guid SchoolId { get; set; }

        public string Name { get; set; }

        public int GradeLevel { get; set; }

        public Guid ClassTeacherId { get; set; }
    }
}