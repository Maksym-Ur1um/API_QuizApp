using API_QuizApp.Models;
using System.ComponentModel.DataAnnotations;

namespace API_QuizApp.DTO.Tests
{
    public class TestListDto
    {
        public int Id { get; set; }
        [Required]
        public string SubjectName { get; set; }
    }
}
