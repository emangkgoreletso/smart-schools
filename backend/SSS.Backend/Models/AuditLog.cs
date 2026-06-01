namespace SSS.Backend.Models
{
    public class AuditLog
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public string Action { get; set; }

        public DateTime Timestamp { get; set; }
    }
}