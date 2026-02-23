using API_QuizApp.DTO.Results;

namespace API_QuizApp.Services.Interfaces
{
    public interface IResultService
    {
        Task<TestResultDto> SubmitTestResultAsync(SubmitTestDto submitData);
    }
}
