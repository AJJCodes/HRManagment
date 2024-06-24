using Datos.BaseDatos;
using Microsoft.EntityFrameworkCore;
using Modelo.Seguridad;
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
        public Usuario_VM? GetUserByEmailAndPassword(string NombreUsuario, string password, out string? errorMsg)
        {
            errorMsg = null;

            var usuarioEntity = (from u in bd.Usuario
                                 join c in bd.Colaboradores on u.IdUsuario equals c.IdUsuario
                                 where u.Activo==true && u.NombreUsuario == NombreUsuario
                                 select new { Usuario = u, Colaborador = c })
                                 .FirstOrDefault();

            // No se encontró el usuario
            if (usuarioEntity == null)
            {
                errorMsg = "Nombre de usuario incorrecto.";
                return null;
            }

            // Se encontró el usuario pero la contraseña no coincide
            if (usuarioEntity.Usuario.Contraseña != password.Trim())
            {
                errorMsg = "Contraseña incorrecta.";
                return null;
            }

            var usuarioVM = new Usuario_VM
            {
                IdUsuario = usuarioEntity.Usuario.IdUsuario,
                NombreUsuario = usuarioEntity.Usuario.NombreUsuario,
                IdRol = usuarioEntity.Usuario.IdRol,
                Activo = usuarioEntity.Usuario.Activo
            };

            return usuarioVM;
        }
        #endregion

        #region Consultas sobre Opciones a usuarios
        public List<Opciones_VM> GetAllowedOptionsByUserRole(Usuario_VM user)
        {
            // Obtiene las opciones permitidas en una sola consulta
            var allowedOptions = (from op in bd.Opciones.AsNoTracking()
                                  join rolop in bd.RolesOpciones.AsNoTracking() on op.IdOpcion equals rolop.IdOpcion
                                  where rolop.IdRol == user.IdRol
                                  select new Opciones_VM
                                  {
                                      NombreOpcion = op.NombreOpcion,
                                      UrlOpcion = op.UrlOpcion,
                                      Icono = op.Icono
                                  })
                                  .ToList();

            return allowedOptions;
        }

        #endregion
    }
}
