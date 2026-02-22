using API_QuizApp.DTO.Results;
using API_QuizApp.Services.Interfaces;

namespace API_QuizApp.Services
{
    public class ResultService : IResultService
    {
        public Task<TestResultDto> SubmitTestResult(int userId, SubmitTestDto submitData)
        {
            throw new NotImplementedException();
        }
    }
}
