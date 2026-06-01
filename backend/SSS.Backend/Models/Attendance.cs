namespace SSS.Backend.Models
{
    public class Attendance
    {
        public Guid Id { get; set; }

        public Guid StudentId { get; set; }

        public Guid ClassId { get; set; }

        public DateTime Date { get; set; }

        public string Status { get; set; }
    }
}