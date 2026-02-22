using System.ComponentModel.DataAnnotations;

namespace API_QuizApp.Models
{
    public class User
    {
        public int UserId { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string UserSurname { get; set; }
        [Required]
        public string PasswordHash { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Role { get; set; }
        public List<AssignedTest> AssignedTests { get; set; } = new List<AssignedTest>();
        public List<TestResult> Results { get; set; } = new List<TestResult>();
    }
}
