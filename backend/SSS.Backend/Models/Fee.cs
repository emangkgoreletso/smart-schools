namespace SSS.Backend.Models
{
    public class Fee
    {
        public Guid Id { get; set; }

        public Guid SchoolId { get; set; }

        public Guid ClassId { get; set; }

        public string FeeName { get; set; }

        public decimal Amount { get; set; }

        public string AcademicYear { get; set; }
    }
}