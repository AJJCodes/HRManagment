using Logica.Contratacion;
using Logica.Seguridad;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Web.Controllers.Seguridad;
using Web.Models;

namespace Web.Controllers
{
    public class HomeController : BaseController
    {
        private readonly ILogger<HomeController> _logger;

        // Modificado para aceptar los parámetros requeridos por el BaseController
        public HomeController(ILogger<HomeController> logger, Acceso_LN ln, IHttpContextAccessor httpContextAccessor)
            : base(ln, httpContextAccessor) // Llamada al constructor del BaseController con los parámetros necesarios
        {
            _logger = logger;
        }


        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
