using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportsController : ControllerBase
    {
        [HttpGet("grades/{studentId}")]
        public IActionResult GetGrades(int studentId)
        {
            return Ok(new { message = $"Grades for student {studentId}" });
        }

        [HttpGet("attendance/{studentId}")]
        public IActionResult GetAttendance(int studentId)
        {
            return Ok(new { message = $"Attendance for student {studentId}" });
        }
    }
}
