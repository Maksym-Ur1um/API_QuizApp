namespace API_QuizApp.DTO.Tests
{
    public class TestDetailDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public List<QuestionDto> Questions { get; set; } = new List<QuestionDto>();
    }
}
