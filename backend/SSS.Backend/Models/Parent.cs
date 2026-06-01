namespace SSS.Backend.Models
{
    public class Parent
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public Guid SchoolId { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }
    }
}