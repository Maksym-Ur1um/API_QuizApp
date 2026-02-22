using API_QuizApp.DTO.Tests;

namespace API_QuizApp.DTO.Results
{
    public class SubmitTestDto
    {
        public int TestId { get; set; }
        public List<SubmitAnswerDto> Answers { get; set; } = new List<SubmitAnswerDto>();
    }
}
