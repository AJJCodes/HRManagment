using Logica.Contratacion;
using Logica.Seguridad;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Modelo.Contratacion;
using Modelo.Seguridad;
using Web.Controllers.Seguridad;

namespace Web.Controllers.Contratacion
{
    public class Personal : BaseController
    {

        private readonly Contratacion_LN ln2;

        public Personal(Acceso_LN ln, IHttpContextAccessor httpContextAccessor) : base(ln, httpContextAccessor)
        {
            ln2 = new Contratacion_LN();
        }

        // GET: Personal
        public ActionResult Index()
        {
            return View();
        }

        // GET: Personal/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Personal/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Personal/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Personal/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Personal/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Personal/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Personal/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        #region CRUD
        [HttpPost]
        public IActionResult AgregarColaboradorYcontrato(ColaboradoresYcontrato_VM Colaborador)
        {
            string? errorMessage = null;
            bool resultado = ln2.AgregarColaboradorYcontrato(Colaborador, out errorMessage);

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
        public IActionResult ValidarExistenciaCodigo(string Codigo)
        {
            bool resultado = ln2.VerificarExistenciaCodigo(Codigo);
            return Json(!resultado);
        }

        [HttpPost]
        public IActionResult ValidarExistenciaUsuario(string Usuario)
        {
            bool resultado = ln2.VerificarExistenciaUsuario(Usuario);
            return Json(!resultado);
        }

        #endregion
        #region Consultas
        [HttpPost]
        public IActionResult ObtenerListColaboradores()
        {
            List<ColaboradoresYcontrato_VM> ListaColaboradores = new List<ColaboradoresYcontrato_VM>();
            string? errorMessage = null;

            // Llamar a tu función para obtener la lista de usuarios
            bool exito = ln2.ProporcionaListaColaboradores(ref ListaColaboradores, out errorMessage);

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
        public IActionResult ObtenerListaRoles()
        {
            List<Roles_VM> ListaRoles = new List<Roles_VM>();
            string? errorMessage = null;

            // Llamar a tu función para obtener la lista de usuarios
            bool exito = ln2.ProporcionaListaRoles(ref ListaRoles, out errorMessage);

            if (exito)
            {
                // Devolver la lista de usuarios en el formato esperado por DataTables
                return Json(new { data = ListaRoles });
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
