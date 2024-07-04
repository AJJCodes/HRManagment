using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modelo.Nomina
{
    public class Nomina_VM
    {
        public int IdRegistroVac { get; set; }
        public double? CantVacDias { get; set; }
        public int? IdDatosLaborales { get; set; }

        public int? IdContrato { get; set; }
        public double? Salario { get; set; }
    }

    public class RegistroNomina_VM : Nomina_VM 
    {
        public string NombreColaborador { get; set; }
        public string CodigoColaborador { get; set; }
    }
}
