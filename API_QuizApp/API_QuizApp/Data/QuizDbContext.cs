using API_QuizApp.Models;
using Microsoft.EntityFrameworkCore;

namespace API_QuizApp.Data
{
    public class QuizDbContext : DbContext
    {
        public QuizDbContext(DbContextOptions<QuizDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Test> Tests { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<AssignedTest> AssignedTests { get; set; }
        public DbSet<TestResult> TestResults { get; set; }

    }
}
