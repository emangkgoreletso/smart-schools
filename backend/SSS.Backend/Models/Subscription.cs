namespace SSS.Backend.Models
{
    public class Subscription
    {
        public Guid Id { get; set; }

        public Guid SchoolId { get; set; }

        public string Plan { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string Status { get; set; }
    }
}