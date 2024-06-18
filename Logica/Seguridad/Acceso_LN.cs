using Datos.BaseDatos;
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
        public Dictionary<string, List<Controlador_VM>> GetAllowedControllersForUser(Usuario_VM user)
        {
            // Obtiene los controladores permitidos en una sola consulta
            var allowedControllers = (from ro in bd.Rol_Operacion.AsNoTracking()
                                      join op in bd.Operaciones.AsNoTracking() on ro.IdOperacion equals op.IdOperacion
                                      join co in bd.Controlador.AsNoTracking() on op.IdControlador equals co.IdControlador
                                      where ro.IdRol == user.IdRol && co.Activo == true
                                      select new { op.NombreOperacion, co.NombreControlador, co.Icono, ModuloNombre = co.Modulo.NombreModulo })
                                      .Distinct()
                                      .ToList();

            // Agrupa los controladores por modulo y crea instancias de Controlador_VM
            var groupedByModule = allowedControllers
                .GroupBy(co => co.ModuloNombre)
                .ToDictionary(g => g.Key, g => g.Select(co => new Controlador_VM
                {
                    NombreControlador = co.NombreControlador,
                    Icono = co.Icono
                }).ToList());

            return groupedByModule;
        }
        #endregion
    }
}
