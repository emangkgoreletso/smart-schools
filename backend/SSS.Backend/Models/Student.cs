namespace SSS.Backend.Models
{
    public class Student
    {
        public Guid Id { get; set; }

        public Guid SchoolId { get; set; }

        public Guid UserId { get; set; }

        public string StudentNumber { get; set; }

        public Guid ClassId { get; set; }

        public DateTime AdmissionDate { get; set; }

        public string Status { get; set; }
    }
}