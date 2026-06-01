namespace SSS.Backend.Models
{
    public class Staff
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public Guid SchoolId { get; set; }

        public string Position { get; set; }
    }
}