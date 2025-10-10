using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services
{
    public class PaymentService
    {
        private readonly AppDbContext _context;

        public PaymentService(AppDbContext context)
        {
            _context = context;
        }

        // Record a new payment
        public async Task<Payment> RecordPaymentAsync(Payment payment)
        {
            payment.PaymentDate = DateTime.Now; // ✅ ensure timestamp is recorded
            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();
            return payment;
        }

        // Get all payments made by a specific student
        public async Task<IEnumerable<Payment>> GetPaymentsByStudentAsync(int studentId)
        {
            return await _context.Payments
                .Where(p => p.StudentId == studentId)
                .OrderByDescending(p => p.PaymentDate) // ✅ fixed: was p.Date
                .ToListAsync();
        }

        // Calculate remaining balance for a student
        public async Task<decimal> GetStudentBalanceAsync(int studentId)
        {
            var totalPaid = await _context.Payments
                .Where(p => p.StudentId == studentId)
                .SumAsync(p => (decimal?)p.Amount) ?? 0m;

            // TODO: Replace with actual fee calculation per student/term later
            decimal termFee = 5000m;
            return termFee - totalPaid;
        }
    }
}
