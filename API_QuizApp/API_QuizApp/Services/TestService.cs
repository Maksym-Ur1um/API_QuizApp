using API_QuizApp.Data;
using API_QuizApp.DTO.Tests;
using API_QuizApp.Models;
using API_QuizApp.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API_QuizApp.Services
{
    public class TestService : ITestService
    {
        private readonly QuizDbContext _db;

        public TestService(QuizDbContext db)
        {
            _db = db;
        }

        public async Task<List<TestListDto>> GetAllTestsAsync()
        {

            List<TestListDto> testList = await _db.Tests.Select(t => new TestListDto
            {
                Id = (t.TestId),
                SubjectName = t.SubjectName
            }).ToListAsync();

            return testList;
        }

        public async Task<TestDetailDto> GetTestByIdAsync(int id)
        {
            Test dbTestDetail = await _db.Tests.Include(q => q.Questions).ThenInclude(a => a.Answers).FirstOrDefaultAsync(x => x.TestId == id);

            if (dbTestDetail == null)
                return null;

            var questionList = dbTestDetail.Questions.Select(t => new QuestionDto
            {
                Id = t.QuestionId,
                QuestionText = t.QuestionText,
                Answers = t.Answers.Select(a => new AnswerDto
                {
                    AnswerText = a.AnswerText,
                    Id = a.AnswerId
                }).ToList()
            }).ToList();

            TestDetailDto testDetail = new TestDetailDto
            {
                Id = dbTestDetail.TestId,
                Title = dbTestDetail.SubjectName,
                Questions = questionList
            };

            return testDetail;
        }
    }
}
