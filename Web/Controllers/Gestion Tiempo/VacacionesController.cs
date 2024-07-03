using Logica.Contratacion;
using Logica.Gestion_Tiempo;
using Logica.Seguridad;
using Microsoft.AspNetCore.Mvc;
using Modelo.Contratacion;
using Modelo.Gestion_Tiempo;
using Modelo.Seguridad;
using Web.Controllers.Seguridad;

namespace Web.Controllers.Gestion_Tiempo
{
    public class VacacionesController : BaseController
    {
        private readonly Vacaciones_LN Ln2;

        public VacacionesController(Acceso_LN ln, IHttpContextAccessor httpContextAccessor) : base(ln, httpContextAccessor)
        {
            Ln2 = new Vacaciones_LN();
        }

        public IActionResult SolitarVacacionesAdmin()
        {
            return View();
        }

        public IActionResult SolitarVacacionesUsuario()
        {
            return View();
        }

        #region Consultas
        [HttpPost]
        public IActionResult ObtenerlistaVacaciones()
        {
            List<VacacionesSolicitadas_VM> ListaVacaciones = new List<VacacionesSolicitadas_VM>();
            string? errorMessage = null;

            // Llamar a tu función para obtener la lista de usuarios
            bool exito = Ln2.ProporcionarListaVacaciones(ref ListaVacaciones, out errorMessage);

            if (exito)
            {
                // Devolver la lista de usuarios en el formato esperado por DataTables
                return Json(new { data = ListaVacaciones });
            }
            else
            {
                // Devolver el mensaje de error en caso de fallo
                return Json(new { error = errorMessage });
            }
        }

        [HttpPost]
        public IActionResult ObtenerListaColaboradoresEquipo()
        {
            List<ColaboradoresYcontrato_VM> ListaColaboradores = new List<ColaboradoresYcontrato_VM>();
            string? errorMessage = null;

            // Llamar a tu función para obtener la lista de usuarios
            bool exito = Ln2.ProporcionaListaColaboradoresMiEquipo(ref ListaColaboradores, out errorMessage);

            if (exito)
            {
                // Devolver la lista de usuarios en el formato esperado por DataTables
                return Json(new { data = ListaColaboradores });
            }
            else
            {
                // Devolver el mensaje de error en caso de fallo
                return Json(new { error = errorMessage });
            }
        }
        #endregion
    }
}
