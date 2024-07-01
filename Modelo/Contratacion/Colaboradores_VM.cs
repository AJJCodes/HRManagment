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

        public string NombresColaborador { get; set; }

        public string ApellidosColaborador { get; set; }

        public int? IdUsuario { get; set; }
    }

    public class ColaboradoresYcontrato_VM : Colaboradores_VM
    {
        public float Salario { get; set; }

        public string? CodigoColaborador { get; set; }

        public DateTime FechaInicio { get; set; }
        public DateTime? FechaFin { get; set; }

        public string NombreUsuario { get; set; }
        public string Contraseña { get; set; }
        public int? Idrol { get; set; } 

    }
}
