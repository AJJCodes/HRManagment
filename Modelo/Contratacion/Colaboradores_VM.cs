using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modelo.Contratacion
{
    public  class Colaboradores_VM
    {
        public int IdColaborador { get; set; }

        public string? NombresColaborador { get; set; }

        public string? ApellidosColaborador { get; set; }

        public int? IdUsuario { get; set; }
    }

    public class ColaboradoresYcontrato_VM : Colaboradores_VM
    {
        public double? Salario { get; set; }

        public string? CodigoColaborador { get; set; }
    }
}
