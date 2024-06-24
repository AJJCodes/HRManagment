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

            if (httpContext.Session.GetString("User") != null)
            {
                if (httpContext.Session.GetString("AllowedOperationsLoaded") == null)
                {
                    var userJson = httpContext.Session.GetString("User");
                    var user = JsonConvert.DeserializeObject<Usuario_VM>(userJson);
                    var optionsAllowed = _ln.GetAllowedOptionsByUserRole(user); // Renombrada

                    var optionsAllowedJson = JsonConvert.SerializeObject(optionsAllowed); // Renombrada
                    httpContext.Session.SetString("AllowedOptions", optionsAllowedJson);
                    httpContext.Session.SetString("AllowedOperationsLoaded", "true");
                }

                var allowedOptionsString = httpContext.Session.GetString("AllowedOptions"); // Renombrada
                var allowedOptionsList = JsonConvert.DeserializeObject<List<Opciones_VM>>(allowedOptionsString); // Renombrada
                context.HttpContext.Items["AllowedOptions"] = allowedOptionsList;
                ViewBag.AllowedOptions = allowedOptionsList; // Asigna a ViewBag
            }
        }
    }
}
