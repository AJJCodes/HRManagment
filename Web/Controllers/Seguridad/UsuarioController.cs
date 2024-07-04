using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers.Seguridad
{
    public class UsuarioController : Controller
    {
        public IActionResult ReporteUsuarioRoles()
        {
            return View();
        }
    }
}
