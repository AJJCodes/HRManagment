using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modelo.Gestion_Tiempo
{
    public  class TipoVacacion_VM
    {
        public int IdTipoVacacion { get; set; }

        public string? NombreTipoVacacion { get; set; }

        public string? DescripcionTipoVacacion { get; set; }

        public bool? EstadoTipoVacacion { get; set; }
    }
}
