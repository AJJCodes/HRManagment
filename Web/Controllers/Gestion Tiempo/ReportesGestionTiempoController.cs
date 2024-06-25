using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers.Gestion_Tiempo
{
    public class ReportesGestionTiempoController : Controller
    {
        //Reporte de Meses con Mas solicitutes de LineChart
        public IActionResult ReporteConGraficaLinea()
        {
            return View();
        }
    }
}
