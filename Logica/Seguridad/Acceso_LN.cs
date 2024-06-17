using Datos.BaseDatos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logica.Seguridad
{
    public  class Acceso_LN
    {
        private readonly Contexto bd;

        public Acceso_LN()
        {
            bd = new Contexto();
        }



        #region Consultas Sobre Usuario
        public Usuario_VM GetUserByEmailAndPassword(string email, string password, out string errorMsg)
        {
            errorMsg = null;

            var usuarioEntity = bd.Usuario.Where(u => u.Activo).FirstOrDefault(u => u.NombreUsuario == email);

            // No se encontró el usuario
            if (usuarioEntity == null)
            {
                errorMsg = "Nombre de usuario incorrecto.";
                return null;
            }

            // Se encontró el usuario pero la contraseña no coincide
            if (usuarioEntity.Contraseña != password.Trim())
            {
                errorMsg = "Contraseña incorrecta.";
                return null;
            }

            var usuarioVM = new Usuario_VM
            {
                IdUsuario = usuarioEntity.IdUsuario,
                NombreUsuario = usuarioEntity.NombreUsuario,
                Nombre = usuarioEntity.Nombre,
                Apellidos = usuarioEntity.Apellidos,
                Email = usuarioEntity.Email,
                IdRol = usuarioEntity.IdRol,
                Activo = usuarioEntity.Activo
            };

            return usuarioVM;
        }
        #endregion
    }
}
