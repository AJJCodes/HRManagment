using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers.Nomina
{
    public class NominaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
