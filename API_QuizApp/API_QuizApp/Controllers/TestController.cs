using API_QuizApp.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API_QuizApp.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        private readonly ITestService _testService;

        public TestController(ITestService testService)
        {
            _testService = testService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllTests()
        {
            int userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);
            var test = await _testService.GetAllTestsAsync(userId);
            return Ok(test);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTestById(int id)
        {
            int userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);
            var test = await _testService.GetTestByIdAsync(id, userId);
            if(test == null)
                return NotFound();
            return Ok(test);
        }
    }
}
