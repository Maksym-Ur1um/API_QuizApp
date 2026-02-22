using System.ComponentModel.DataAnnotations;

namespace API_QuizApp.DTO.Tests
{
    public class AnswerDto
    {
        public int Id { get; set; }
        [Required]
        public string AnswerText { get; set; }
    }
}
