using System.ComponentModel.DataAnnotations;

namespace API_QuizApp.Models
{
    public class Question
    {
        public int QuestionId { get; set; }
        [Required]
        public string QuestionText { get; set; }
        public int TestId { get; set; }
        public Test Test { get; set; }
        public List<Answer> Answers { get; set; } = new List<Answer>();
    }
}
