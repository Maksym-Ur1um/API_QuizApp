using System.ComponentModel.DataAnnotations;

namespace API_QuizApp.DTO.Tests
{
    public class QuestionDto
    {
        public int Id { get; set; }
        [Required]
        public string QuestionText { get; set; }
        public List<AnswerDto> Answers { get; set; } = new List<AnswerDto>();
    }
}
