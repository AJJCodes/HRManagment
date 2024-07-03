using Logica.Contratacion;
using Logica.Seguridad;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Seguridad;

namespace Web.Controllers.Nomina
{
    public class ReportesNominaController : BaseController
    {
        public ReportesNominaController(Acceso_LN ln, IHttpContextAccessor httpContextAccessor) : base(ln, httpContextAccessor)
        {

        }

        public IActionResult ReporteTotalPagarVac()
        {
            return View();
        }
    }
}
