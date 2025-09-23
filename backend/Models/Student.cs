namespace backend.Models
{
    public class Student : User
    {
        public string Grade { get; set; } = string.Empty;
        public string EnrollmentNumber { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public List<Submission> Submissions { get; set; } = new();
        public List<TestResult> TestResults { get; set; } = new();
    }
}
