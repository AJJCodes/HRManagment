using Logica.Gestion_Tiempo;
using Logica.Seguridad;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers.Seguridad
{
    public class RolesController : BaseController
    {

        public RolesController(Acceso_LN ln, IHttpContextAccessor httpContextAccessor) : base(ln, httpContextAccessor)
        {

        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
