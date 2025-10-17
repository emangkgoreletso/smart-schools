using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ParentsController : ControllerBase
    {
        [HttpGet("notifications")]
        public IActionResult GetNotifications()
        {
            return Ok(new { message = "Parent notifications" });
        }

        [HttpGet("student-progress/{studentId}")]
        public IActionResult GetProgress(int studentId)
        {
            return Ok(new { message = $"Progress for student {studentId}" });
        }
    }
}
