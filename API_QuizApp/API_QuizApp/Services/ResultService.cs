using API_QuizApp.Data;
using API_QuizApp.DTO.Results;
using API_QuizApp.Models;
using API_QuizApp.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API_QuizApp.Services
{
    public class ResultService : IResultService
    {
        private readonly QuizDbContext _db;
        public ResultService(QuizDbContext db)
        {
            _db = db;
        }

        public async Task<TestResultDto> SubmitTestResultAsync(int userId, SubmitTestDto submitData)
        {
            string testTitle = await _db.Tests.Where(t => t.TestId == submitData.TestId)
                .Select(t => t.SubjectName)
                .FirstOrDefaultAsync();
            List<Answer> answers = await _db.Answers.Where(a =>
                a.Question.TestId == submitData.TestId &&
                a.IsCorrect == true
            ).ToListAsync();
            int totalQuestions = await _db.Questions
                .Where(a => a.TestId == submitData.TestId).CountAsync();
            int correctAnswers = 0;

            foreach(var submittedAnswer in submitData.Answers)
            {
                if (answers.Any(a => a.AnswerId == submittedAnswer.SelectedAnswerId))
                    correctAnswers++;
            }

            TestResultDto testResult = new TestResultDto()
            {
                TestTitle = testTitle,
                TotalQuestions = totalQuestions,
                CorrectAnswers = correctAnswers
            };
            return testResult;
        }
    }
}
