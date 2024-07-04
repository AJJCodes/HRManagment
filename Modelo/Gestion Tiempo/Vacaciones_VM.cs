using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modelo.Gestion_Tiempo
{
    public  class Vacaciones_VM
    {
        public int IdSolicitudVacaciones { get; set; }

        public DateTime? FechaInicio { get; set; }

        public DateTime? FechaFin { get; set; }

        public double? CantDias { get; set; }

        public int? IdRegistroColaborador { get; set; }
    }

    public class VacacionesSolicitadas_VM: Vacaciones_VM
    {
        public string NombreColaborador { get; set;}
        public string CodigoColaborador { get; set;}

        public int? IdTipoVacacion { get; set; }

        public int CreadoPor { get; set; }
        public string? DescripcionVacaion { get; set; }
    }
}
