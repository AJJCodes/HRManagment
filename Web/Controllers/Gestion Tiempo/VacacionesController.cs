using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers.Gestion_Tiempo
{
    public class VacacionesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
