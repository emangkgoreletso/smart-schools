namespace SSS.Backend.Models
{
    public class Notice
    {
        public Guid Id { get; set; }

        public Guid SchoolId { get; set; }

        public string Title { get; set; }

        public string Message { get; set; }

        public string Audience { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}