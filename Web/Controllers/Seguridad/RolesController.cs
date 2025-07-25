﻿using Logica.Seguridad;
using Logica.Gestion_Tiempo;
using Logica.Seguridad;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers.Seguridad
{
    public class RolesController : BaseController
    {
        private readonly VistaUsuario_LN _roles_LN;


        public RolesController(Acceso_LN ln, IHttpContextAccessor httpContextAccessor) : base(ln, httpContextAccessor)
        {
            _roles_LN = new VistaUsuario_LN();
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult ObtenerListaSeguridad()
        {
            List<RegistroVistaUsuario> listaSeguridad = new List<RegistroVistaUsuario>();
            if (_roles_LN.ProporcionarListaUsuario(ref listaSeguridad, out string? errorMessage))
            {
                return Json(new { data = listaSeguridad });
            }
            else
            {
                return Json(new { error = errorMessage });
            }
        }
    }
}
