using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modelo.Contratacion
{
    public  class DatosLaborales_VM
    {
        public int IdRegistroDatosLaborales { get; set; }

        public string? CodigoColaborador { get; set; }

        public bool? EsActual { get; set; }

        public bool? EsNuevo { get; set; }

        public int? IdContrato { get; set; }
    }
}
