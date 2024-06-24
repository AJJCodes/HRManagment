using Modelo.Seguridad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logica.Seguridad
{
    public interface IAcceso_LN
    {
        Usuario_VM? GetUserByEmailAndPassword(string NombreUsuario, string password, out string? errorMsg);
        List<Opciones_VM> GetAllowedOptionsByUserRole(Usuario_VM user);
    }
}
