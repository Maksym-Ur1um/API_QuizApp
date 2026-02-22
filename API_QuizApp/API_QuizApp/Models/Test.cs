using System.ComponentModel.DataAnnotations;

namespace API_QuizApp.Models
{
    public class Test
    {
        public int TestId { get; set; }
        [Required]
        public string SubjectName { get; set;  }
        public List<Question> Questions { get; set; } = new List<Question>();
        public List<AssignedTest> AssignedTests { get; set; } = new List<AssignedTest>();
        public List<TestResult> Results { get; set; } = new List<TestResult>();

    }
}
