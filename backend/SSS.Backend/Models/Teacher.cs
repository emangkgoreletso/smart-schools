namespace SSS.Backend.Models
{
    public class Teacher
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public Guid SchoolId { get; set; }

        public DateTime HireDate { get; set; }

        public string Status { get; set; }
    }
}