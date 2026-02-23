using API_QuizApp.DTO.Results;
using API_QuizApp.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API_QuizApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ResultController : ControllerBase
    {
        private readonly IResultService _resultService;
        public ResultController(IResultService resultService)
        {
            _resultService = resultService;
        }

        [HttpPost("submit")]
        public async Task<IActionResult> SubmitTest(SubmitTestDto submitData)
        {
            int userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);
            var result = await _resultService.SubmitTestResultAsync(userId,  submitData);
            return Ok(result);
        }
    }
}
