namespace backend.Models
{
    public class Payment
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; } = DateTime.UtcNow;
        public string Method { get; set; } = string.Empty; // Mobile Money, Bank Transfer
        public string ReceiptNumber { get; set; } = string.Empty;
        public string Status { get; set; } = "Completed"; // Pending, Completed, Failed
    }
}
