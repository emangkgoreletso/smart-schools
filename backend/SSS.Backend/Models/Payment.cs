namespace SSS.Backend.Models
{
    public class Payment
    {
        public Guid Id { get; set; }

        public Guid StudentId { get; set; }

        public decimal Amount { get; set; }

        public string PaymentMethod { get; set; }

        public string TransactionRef { get; set; }

        public DateTime PaymentDate { get; set; }

        public string Status { get; set; }
    }
}