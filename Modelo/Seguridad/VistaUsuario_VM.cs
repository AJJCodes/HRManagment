using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logica.Seguridad
{
    public  class VistaUsuario_VM
    {
        public int IdUsuario { get; set; }
        public string? NombreUsuario { get; set; }
        public string? NombreRol { get; set; }
        public int IdRol { get; set; }
    }
    public class RegistroVistaUsuario : VistaUsuario_VM
    {
        public string? NombreColaborador { get; set; }
        public string? CodigoColaborador { get; set; }
    }
}
