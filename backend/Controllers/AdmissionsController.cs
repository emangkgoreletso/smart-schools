using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdmissionsController : ControllerBase
    {
        [HttpPost("apply")]
        public IActionResult Apply([FromBody] object application)
        {
            return Ok(new { message = "Admission application submitted" });
        }

        [HttpPost("transfer")]
        public IActionResult Transfer([FromBody] object transfer)
        {
            return Ok(new { message = "Transfer request submitted" });
        }
    }
}
