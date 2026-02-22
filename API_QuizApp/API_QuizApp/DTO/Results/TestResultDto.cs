using System.ComponentModel.DataAnnotations;

namespace API_QuizApp.DTO.Results
{
    public class TestResultDto
    {
        [Required]
        public string TestTitle { get; set; }
        public int TotalQuestions { get; set; }
        public int CorrectAnswers { get; set; }
    }
}
