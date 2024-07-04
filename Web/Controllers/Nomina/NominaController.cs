using Logica.Nomina;
using Microsoft.AspNetCore.Mvc;
using Modelo.Nomina;

namespace Web.Controllers.Nomina
{
    public class NominaController : Controller
    {
        private readonly Nomina_LN _nominaLN;

        public NominaController()
        {
            _nominaLN = new Nomina_LN();
        }

        [HttpPost]
        public IActionResult ObtenerListaNomina()
        {
            List<RegistroNomina_VM> listaNomina = new List<RegistroNomina_VM>();
            string? errorMessage;

            if (_nominaLN.ProporcionarListaVacaciones(ref listaNomina, out errorMessage))
            {
                return Json(new { data = listaNomina });
            }
            else
            {
                return Json(new { error = errorMessage });
            }
        }
    }
    /*public class NominaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }*/
}
