using API_QuizApp.Models;

namespace API_QuizApp.Services.Interfaces
{
    public interface ITokenService
    {
        public string GenerateJwtToken(User user);
    }
}
