using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modelo.Seguridad
{
    public  class Usuario_VM
    {
        public int IdUsuario { get; set; }

        public string? NombreUsuario { get; set; }

        public string? Contraseña { get; set; }

        public DateTime? FechaCreacion { get; set; }

        public bool? Activo { get; set; }

        public int? IdRol { get; set; }

        public string? NombreColaborador { get; set; }
        public string ? Apelidos { get; set; }
    }
}
