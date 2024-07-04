using Logica.Nomina;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Seguridad;
using System.Collections.Generic;
using Modelo.Nomina;
using Logica.Seguridad;

namespace Web.Controllers.Nomina
{
    public class ReportesNominaController : BaseController
    {
        private readonly Nomina_LN _nomina_LN;

        public ReportesNominaController(Acceso_LN ln, IHttpContextAccessor httpContextAccessor) : base(ln, httpContextAccessor)
        {
            _nomina_LN = new Nomina_LN();
        }

        public IActionResult ReporteTotalPagarVac()
        {
            return View();
        }

        [HttpPost]
        public IActionResult ObtenerListaNomina()
        {
            List<RegistroNomina_VM> listaNomina = new List<RegistroNomina_VM>();
            if (_nomina_LN.ProporcionarListaVacaciones(ref listaNomina, out string? errorMessage))
            {
                return Json(new { data = listaNomina });
            }
            else
            {
                return Json(new { error = errorMessage });
            }
        }
    }
}
