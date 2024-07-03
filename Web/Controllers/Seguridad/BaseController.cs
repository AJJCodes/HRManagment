using Logica.Seguridad;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Http;
using Modelo.Seguridad;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Web.Controllers.Seguridad
{
    public class BaseController : Controller
    {
        private readonly Acceso_LN _ln;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public BaseController(Acceso_LN ln, IHttpContextAccessor httpContextAccessor)
        {
            _ln = ln;
            _httpContextAccessor = httpContextAccessor;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            var httpContext = _httpContextAccessor.HttpContext;
            Usuario_VM user = null;

            if (httpContext.Session.GetString("User") != null)
            {
                var userJson = httpContext.Session.GetString("User");
                user = JsonConvert.DeserializeObject<Usuario_VM>(userJson);

                if (httpContext.Session.GetString("AllowedOperationsLoaded") == null)
                {
                    var optionsAllowed = _ln.GetAllowedOptionsByUserRole(user); // Renombrada

                    var optionsAllowedJson = JsonConvert.SerializeObject(optionsAllowed); // Renombrada
                    httpContext.Session.SetString("AllowedOptions", optionsAllowedJson);
                    httpContext.Session.SetString("AllowedOperationsLoaded", "true");
                }

                var allowedOptionsString = httpContext.Session.GetString("AllowedOptions"); // Renombrada
                var allowedOptionsList = JsonConvert.DeserializeObject<List<Opciones_VM>>(allowedOptionsString); // Renombrada
                context.HttpContext.Items["AllowedOptions"] = allowedOptionsList;
                ViewBag.AllowedOptions = allowedOptionsList; // Asigna a ViewBag

                var userRole = _ln.GetUserRole(user); // Obtener el rol del usuario
                ViewBag.UserRole = userRole.NombreRol; // Asigna el rol del usuario a ViewBag

                var NombreColaborador = _ln.GetUserRealData(user);
                ViewBag.NombreColaborador = NombreColaborador.NombresColaborador;
                ViewBag.ApellidosColaborador = NombreColaborador.ApellidosColaborador;



                // Obtener el nombre del controlador y la acción actuales
                var controller = context.RouteData.Values["controller"]?.ToString().ToLower();
                var action = context.RouteData.Values["action"]?.ToString().ToLower();
                ViewBag.CurrentController = controller;
                ViewBag.CurrentAction = action;
            }
        }


    }
}
