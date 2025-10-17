using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        [HttpPost("pay")]
        public IActionResult PayFees([FromBody] object paymentDto)
        {
            return Ok(new { message = "Payment successful", receiptId = 123 });
        }

        [HttpGet("history/{studentId}")]
        public IActionResult PaymentHistory(int studentId)
        {
            return Ok(new { message = $"Payment history for student {studentId}" });
        }
    }
}
