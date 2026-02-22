using System.ComponentModel.DataAnnotations;

namespace API_QuizApp.Models
{
    public class Answer
    {
        public int AnswerId { get; set; }
        [Required]
        public string AnswerText { get; set; }
        public int QuestionId { get; set; }
        public bool IsCorrect { get; set; }
        public Question Question { get; set; }
    }
}
