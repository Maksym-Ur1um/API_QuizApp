using System.ComponentModel.DataAnnotations;

namespace API_QuizApp.Models
{
    public class TestResult
    {
        public int TestResultId { get; set; }
        public int UserId { get; set; }
        public int TestId { get; set; }
        public int Score { get; set; }
        public User User { get; set; }
        public Test Test { get; set; }
    }
}
