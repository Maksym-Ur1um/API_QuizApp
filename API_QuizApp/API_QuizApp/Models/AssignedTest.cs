using System.ComponentModel.DataAnnotations;

namespace API_QuizApp.Models
{
    public class AssignedTest
    {
        public int AssignedTestId { get; set; }
        public int UserId { get; set; }
        public int TestId { get; set; }
        public User User { get; set; }
        public Test Test { get; set; }
    }
}
