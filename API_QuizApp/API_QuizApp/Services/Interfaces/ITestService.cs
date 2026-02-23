using API_QuizApp.DTO.Tests;

namespace API_QuizApp.Services.Interfaces
{
    public interface ITestService
    {
        public Task<List<TestListDto>> GetAllTestsAsync(int userId);
        public Task<TestDetailDto> GetTestByIdAsync(int id, int userId);

    }
}
