using Logica.Contratacion;
using Logica.Gestion_Tiempo;
using Logica.Seguridad;
using Microsoft.AspNetCore.Mvc;
using Modelo.Contratacion;
using Modelo.Gestion_Tiempo;
using Modelo.Seguridad;
using Newtonsoft.Json;
using Web.Controllers.Seguridad;

namespace Web.Controllers.Gestion_Tiempo
{
    public class VacacionesController : BaseController
    {
        private readonly Vacaciones_LN Ln2;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public VacacionesController(Acceso_LN ln, IHttpContextAccessor httpContextAccessor) : base(ln, httpContextAccessor)
        {
            Ln2 = new Vacaciones_LN();
            _httpContextAccessor = httpContextAccessor;
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
            // Obtener el ID del usuario logueado
            var httpContext = _httpContextAccessor.HttpContext;
            Usuario_VM user = null;

            if (httpContext.Session.GetString("User") != null)
            {
                var userJson = httpContext.Session.GetString("User");
                user = JsonConvert.DeserializeObject<Usuario_VM>(userJson);
            }


            // Ahora tienes el ID del usuario
            var userId = user.IdUsuario;
            List<VacacionesSolicitadas_VM> ListaVacaciones = new List<VacacionesSolicitadas_VM>();
            string? errorMessage = null;


            //Conseguir el 
            // Llamar a tu función para obtener la lista de usuarios
            bool exito = Ln2.ProporcionarListaVacaciones(userId, ref ListaVacaciones, out errorMessage);

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
        public IActionResult ObtenerlistaVacacionesPersonal()
        {
            // Obtener el ID del usuario logueado
            var httpContext = _httpContextAccessor.HttpContext;
            Usuario_VM user = null;

            if (httpContext.Session.GetString("User") != null)
            {
                var userJson = httpContext.Session.GetString("User");
                user = JsonConvert.DeserializeObject<Usuario_VM>(userJson);
            }


            // Ahora tienes el ID del usuario
            var userId = user.IdUsuario;
            List<VacacionesSolicitadas_VM> ListaVacaciones = new List<VacacionesSolicitadas_VM>();
            string? errorMessage = null;


            //Conseguir el 
            // Llamar a tu función para obtener la lista de usuarios
            bool exito = Ln2.ProporcionarListaVacacionesPersonal(userId, ref ListaVacaciones, out errorMessage);

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

        [HttpPost]
        public IActionResult ObtenerDiasAcumuladoColaborador(int IdColaborador)
        {
            string Mensaje = "";






            //Conseguir el 
            // Llamar a tu función para obtener la lista de usuarios
            double DiasAcumulados = Ln2.ConseguirDiasAcumuladosXColaborador(IdColaborador ,ref Mensaje);

            if (Mensaje != null)
            {
                // Devolver la lista de usuarios en el formato esperado por DataTables
                return Json(new { data = DiasAcumulados });
            }
            else
            {
                // Devolver el mensaje de error en caso de fallo
                return Json(new { error = Mensaje });
            }
        }

        [HttpPost]
        public IActionResult ObtenerMisDiasAcumulados()
        {
            string Mensaje = "";


            var httpContext = _httpContextAccessor.HttpContext;
            Usuario_VM user = null;

            if (httpContext.Session.GetString("User") != null)
            {
                var userJson = httpContext.Session.GetString("User");
                user = JsonConvert.DeserializeObject<Usuario_VM>(userJson);
            }


            var userId = user.IdUsuario;


            //Conseguir el 
            // Llamar a tu función para obtener la lista de usuarios
            double DiasAcumulados = Ln2.ConseguirDiasAcumuladosPersonal(userId, ref Mensaje);

            if (Mensaje != null)
            {
                // Devolver la lista de usuarios en el formato esperado por DataTables
                return Json(new { data = DiasAcumulados });
            }
            else
            {
                // Devolver el mensaje de error en caso de fallo
                return Json(new { error = Mensaje });
            }
        }

        [HttpPost]
        public IActionResult ObtenerMisDatosColaborador()
        {
            string Mensaje = "";


            var httpContext = _httpContextAccessor.HttpContext;
            Usuario_VM user = null;

            if (httpContext.Session.GetString("User") != null)
            {
                var userJson = httpContext.Session.GetString("User");
                user = JsonConvert.DeserializeObject<Usuario_VM>(userJson);
            }


            var userId = user.IdUsuario;


            //Conseguir el 
            // Llamar a tu función para obtener la lista de usuarios
            string NombreCol = Ln2.ConseguirMisDatosColaborador(userId, ref Mensaje);

            if (Mensaje != null)
            {
                // Devolver la lista de usuarios en el formato esperado por DataTables
                return Json(new { data = NombreCol });
            }
            else
            {
                // Devolver el mensaje de error en caso de fallo
                return Json(new { error = Mensaje });
            }
        }
        [HttpPost]
        public IActionResult ObtenerListaTipoVacaciones()
        {
            List<TipoVacacion_VM> ListaTipoVacacion = new List<TipoVacacion_VM>();
            string? errorMessage = null;

            // Llamar a tu función para obtener la lista de usuarios
            bool exito = Ln2.ProporcionaListTipoVacacion(ref ListaTipoVacacion, out errorMessage);

            if (exito)
            {
                // Devolver la lista de usuarios en el formato esperado por DataTables
                return Json(new { data = ListaTipoVacacion });
            }
            else
            {
                // Devolver el mensaje de error en caso de fallo
                return Json(new { error = errorMessage });
            }
        }
        #endregion

        #region Solicitud Admin
        [HttpPost]
        public IActionResult AgregarNuevaSolicitudAdmin(VacacionesSolicitadas_VM Solicitud)
        {

            // Obtener el ID del usuario logueado
            var httpContext = _httpContextAccessor.HttpContext;
            Usuario_VM user = null;

            if (httpContext.Session.GetString("User") != null)
            {
                var userJson = httpContext.Session.GetString("User");
                user = JsonConvert.DeserializeObject<Usuario_VM>(userJson);
            }


            // Ahora tienes el ID del usuario
            var userId = user.IdUsuario;
            string? errorMessage = null;

            Solicitud.CreadoPor = userId;
            bool resultado = Ln2.AgregarNuevaSolicitudVacacion(Solicitud, out errorMessage);

            if (resultado)
            {
                return Json(new { success = true });
            }
            else
            {
                return Json(new { success = false, error = errorMessage });
            }
        }

        [HttpPost]
        public IActionResult AutorizarSolicitud(int Idsolicitud)
        {

            // Obtener el ID del usuario logueado
            var httpContext = _httpContextAccessor.HttpContext;
            Usuario_VM user = null;

            if (httpContext.Session.GetString("User") != null)
            {
                var userJson = httpContext.Session.GetString("User");
                user = JsonConvert.DeserializeObject<Usuario_VM>(userJson);
            }


            // Ahora tienes el ID del usuario
            var userId = user.IdUsuario;
            string? errorMessage = null;


            bool resultado = Ln2.AutorizarVacacion(Idsolicitud, userId, out errorMessage);

            if (resultado)
            {
                return Json(new { success = true });
            }
            else
            {
                return Json(new { success = false, error = errorMessage });
            }
        }

        [HttpPost]
        public IActionResult RechazarSolicitud(int Idsolicitud)
        {

            // Obtener el ID del usuario logueado
            var httpContext = _httpContextAccessor.HttpContext;
            Usuario_VM user = null;

            if (httpContext.Session.GetString("User") != null)
            {
                var userJson = httpContext.Session.GetString("User");
                user = JsonConvert.DeserializeObject<Usuario_VM>(userJson);
            }


            // Ahora tienes el ID del usuario
            var userId = user.IdUsuario;
            string? errorMessage = null;


            bool resultado = Ln2.RechazarSolicitud(Idsolicitud, userId, out errorMessage);

            if (resultado)
            {
                return Json(new { success = true });
            }
            else
            {
                return Json(new { success = false, error = errorMessage });
            }
        }
        #endregion
        #region Solicitud Individuo
        [HttpPost]
        public IActionResult AgregarNuevaSolicitudPersonal(VacacionesSolicitadas_VM Solicitud)
        {

            // Obtener el ID del usuario logueado
            var httpContext = _httpContextAccessor.HttpContext;
            Usuario_VM user = null;

            if (httpContext.Session.GetString("User") != null)
            {
                var userJson = httpContext.Session.GetString("User");
                user = JsonConvert.DeserializeObject<Usuario_VM>(userJson);
            }


            // Ahora tienes el ID del usuario
            var userId = user.IdUsuario;
            string? errorMessage = null;

            Solicitud.CreadoPor = userId;
            Solicitud.IdRegistroColaborador = userId;
            bool resultado = Ln2.AgregarNuevaSolicitudVacacionPersonal(Solicitud, out errorMessage);

            if (resultado)
            {
                return Json(new { success = true });
            }
            else
            {
                return Json(new { success = false, error = errorMessage });
            }
        }
        #endregion
    }
}
