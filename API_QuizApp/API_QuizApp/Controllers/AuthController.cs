using API_QuizApp.Data;
using API_QuizApp.DTO;
using API_QuizApp.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_QuizApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly QuizDbContext _quizDbContext;
        private readonly ITokenService _tokenService;

        public AuthController(QuizDbContext quizDbContext, ITokenService tokenService)
        {
            _quizDbContext = quizDbContext;
            _tokenService = tokenService;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await _quizDbContext.Users.
                FirstOrDefaultAsync(u => u.Email == loginDto.Email);
            if (user == null)
            {
                return Unauthorized("Неверный логин или пароль");
            }
            if (BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
            {
                var token = _tokenService.GenerateJwtToken(user);
                return Ok(new { Token = token });
            }
            return Unauthorized("Неверный логин или пароль");
        }
    }
}
