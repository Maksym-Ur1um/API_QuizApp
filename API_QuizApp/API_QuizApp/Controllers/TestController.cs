using Microsoft.AspNetCore.Mvc;

namespace API_QuizApp.Controllers
{
    public class TestController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
