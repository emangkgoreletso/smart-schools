namespace SSS.Backend.Models
{
    public class PaymentTransaction
    {
        public Guid Id { get; set; }

        public Guid PaymentId { get; set; }

        public string TransactionReference { get; set; }

        public string Status { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}