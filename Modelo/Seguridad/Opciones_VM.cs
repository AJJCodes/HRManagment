using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modelo.Seguridad
{
    public  class Opciones_VM
    {
        public int IdOpcion { get; set; }

        public string NombreOpcion { get; set; } = null!;

        public string? UrlOpcion { get; set; }

        public string? Icono { get; set; }

        public string? Idpadre { get; set;}
    }
}
