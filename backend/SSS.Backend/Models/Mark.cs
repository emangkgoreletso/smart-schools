namespace SSS.Backend.Models
{
    public class Mark
    {
        public Guid Id { get; set; }

        public Guid StudentId { get; set; }

        public Guid AssessmentId { get; set; }

        public decimal Score { get; set; }

        public string Grade { get; set; }
    }
}