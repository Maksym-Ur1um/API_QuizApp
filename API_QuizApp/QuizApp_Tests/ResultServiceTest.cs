using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Xunit;
using API_QuizApp.Data;
using API_QuizApp.DTO.Results;
using API_QuizApp.Models;
using API_QuizApp.Services;

namespace API_QuizApp
{
    public class ResultServiceTests
    {
        private QuizDbContext GetDbContext(string dbName)
        {
            var options = new DbContextOptionsBuilder<QuizDbContext>()
                .UseInMemoryDatabase(databaseName: dbName)
                .Options;

            return new QuizDbContext(options);
        }

        private async Task<(int testId, int correctAns1, int correctAns2, int wrongAns1)> SeedDatabaseAsync(QuizDbContext context)
        {
            var test = new Test { SubjectName = "C# LINQ Basics" };

            var question1 = new Question { QuestionText = "What is FirstOrDefault?", Test = test };
            var answer1Correct = new Answer { AnswerText = "Returns first or null", IsCorrect = true, Question = question1 };
            var answer1Wrong = new Answer { AnswerText = "Throws error", IsCorrect = false, Question = question1 };

            var question2 = new Question { QuestionText = "What is Where?", Test = test };
            var answer2Correct = new Answer { AnswerText = "Filters data", IsCorrect = true, Question = question2 };
            var answer2Wrong = new Answer { AnswerText = "Sorts data", IsCorrect = false, Question = question2 };

            context.Tests.Add(test);
            context.Questions.AddRange(question1, question2);
            context.Answers.AddRange(answer1Correct, answer1Wrong, answer2Correct, answer2Wrong);

            await context.SaveChangesAsync();

            return (test.TestId, answer1Correct.AnswerId, answer2Correct.AnswerId, answer1Wrong.AnswerId);
        }

        [Fact]
        public async Task SubmitTestResultAsync_ShouldReturnMaxScore_WhenAllAnswersAreCorrect()
        {
            var dbName = Guid.NewGuid().ToString();
            using var context = GetDbContext(dbName);
            var (testId, correctAns1, correctAns2, _) = await SeedDatabaseAsync(context);

            var resultService = new ResultService(context);

            var dto = new SubmitTestDto
            {
                TestId = testId,
                Answers = new List<SubmitAnswerDto>
                {
                    new SubmitAnswerDto { SelectedAnswerId = correctAns1 },
                    new SubmitAnswerDto { SelectedAnswerId = correctAns2 }
                }
            };

            var result = await resultService.SubmitTestResultAsync(dto);

            result.Should().NotBeNull();
            result.TestTitle.Should().Be("C# LINQ Basics");
            result.TotalQuestions.Should().Be(2);
            result.CorrectAnswers.Should().Be(2);
        }

        [Fact]
        public async Task SubmitTestResultAsync_ShouldReturnPartialScore_WhenOnlyOneAnswerIsCorrect()
        {
            var dbName = Guid.NewGuid().ToString();
            using var context = GetDbContext(dbName);
            var (testId, correctAns1, _, wrongAns1) = await SeedDatabaseAsync(context);

            var resultService = new ResultService(context);

            var dto = new SubmitTestDto
            {
                TestId = testId,
                Answers = new List<SubmitAnswerDto>
                {
                    new SubmitAnswerDto { SelectedAnswerId = correctAns1 },
                    new SubmitAnswerDto { SelectedAnswerId = wrongAns1 }
                }
            };

            var result = await resultService.SubmitTestResultAsync(dto);

            result.Should().NotBeNull();
            result.TotalQuestions.Should().Be(2);
            result.CorrectAnswers.Should().Be(1);
        }

        [Fact]
        public async Task SubmitTestResultAsync_ShouldReturnZero_WhenAllAnswersAreWrong()
        {
            var dbName = Guid.NewGuid().ToString();
            using var context = GetDbContext(dbName);
            var (testId, _, _, _) = await SeedDatabaseAsync(context);

            var resultService = new ResultService(context);

            var dto = new SubmitTestDto
            {
                TestId = testId,
                Answers = new List<SubmitAnswerDto>
                {
                    new SubmitAnswerDto { SelectedAnswerId = 9998 },
                    new SubmitAnswerDto { SelectedAnswerId = 9999 }
                }
            };

            var result = await resultService.SubmitTestResultAsync(dto);

            result.Should().NotBeNull();
            result.TotalQuestions.Should().Be(2);
            result.CorrectAnswers.Should().Be(0);
        }
    }
}