namespace backend.Models
{
    public class Assignment
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime DueDate { get; set; }
        public int TeacherId { get; set; }
        public string FilePath { get; set; } = string.Empty;
        public List<Submission> Submissions { get; set; } = new();
    }
}
