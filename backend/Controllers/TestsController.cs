using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestsController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetTests()
        {
            return Ok(new { message = "List of available tests" });
        }

        [HttpPost("create")]
        public IActionResult CreateTest([FromBody] object test)
        {
            return Ok(new { message = "Test created" });
        }

        [HttpPost("submit")]
        public IActionResult SubmitAnswers([FromBody] object submission)
        {
            return Ok(new { message = "Answers submitted", score = 80 });
        }

        [HttpGet("results/{studentId}")]
        public IActionResult GetResults(int studentId)
        {
            return Ok(new { message = $"Results for student {studentId}" });
        }
    }
}
