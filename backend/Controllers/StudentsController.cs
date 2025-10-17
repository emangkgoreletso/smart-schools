using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        [HttpGet("dashboard")]
        public IActionResult Dashboard()
        {
            return Ok(new { message = "Student dashboard data" });
        }

        [HttpGet("assignments")]
        public IActionResult GetAssignments()
        {
            return Ok(new { message = "List of assignments" });
        }
    }
}
