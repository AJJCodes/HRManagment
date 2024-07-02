using Logica.Contratacion;
using Logica.Seguridad;
using Microsoft.AspNetCore.Mvc;
using Modelo.Seguridad;
using Microsoft.AspNetCore.Http; 
using Newtonsoft.Json;

namespace Web.Controllers.Seguridad
{
    public class AccesoController : Controller
    {


        private readonly Acceso_LN ln;
        public AccesoController()
        {
            ln = new Acceso_LN();
        }

        public IActionResult Index()
        {
            // Configurar encabezados para evitar el almacenamiento en caché de la página de login
            Response.Headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
            Response.Headers["Pragma"] = "no-cache";
            Response.Headers["Expires"] = "-1";

            // Limpiar la sesión
            HttpContext.Session.Clear();

            return View();
        }

        [HttpPost]
        public IActionResult Login(string NombreUsuario, string password)
        {
            string errorMsg;
            Usuario_VM oUser = ln.GetUserByEmailAndPassword(NombreUsuario, password, out errorMsg);

            if (!string.IsNullOrEmpty(errorMsg))
            {
                return Json(new { success = false, errorMessage = errorMsg });
            }

            // Serializar el objeto Usuario_VM a JSON y almacenarlo en la sesión
            HttpContext.Session.SetString("User", JsonConvert.SerializeObject(oUser));
            return Json(new { success = true });
        }


        public IActionResult Logout()
        {
            // Limpiar los datos de sesión
            HttpContext.Session.Remove("User");
            HttpContext.Session.Remove("AllowedOperationsLoaded");

            // Redirigir al login
            return RedirectToAction("Index", "Acceso");
        }
    }
}
