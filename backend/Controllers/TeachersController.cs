using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeachersController : ControllerBase
    {
        [HttpGet("dashboard")]
        public IActionResult Dashboard()
        {
            return Ok(new { message = "Teacher dashboard data" });
        }

        [HttpPost("create-assignment")]
        public IActionResult CreateAssignment([FromBody] object assignment)
        {
            return Ok(new { message = "Assignment created" });
        }
    }
}
