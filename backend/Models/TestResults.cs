namespace backend.Models
{
    public class TestResult
    {
        public int Id { get; set; }
        public int TestId { get; set; }
        public int StudentId { get; set; }
        public int Score { get; set; }
        public DateTime TakenAt { get; set; } = DateTime.UtcNow;
    }
}
