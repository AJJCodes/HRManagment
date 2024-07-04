using Datos.BaseDatos;
using Modelo.Nomina;
using Modelo.Seguridad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logica.Seguridad
{
    public class VistaUsuario_LN
    {
        private readonly Contexto bd;
        public VistaUsuario_LN()
        {
            bd = new Contexto();
        }

        #region Consulta
        public bool ProporcionarListaUsuario(ref List<RegistroVistaUsuario> ListaUsuario, out string? errorMessage)
        {
            try
            {
                // Utilizar LINQ para seleccionar los campos necesarios y mapearlos a Roles_VM
                ListaUsuario = (from us in bd.Usuario
                                join R in bd.Roles on us.IdRol equals R.IdRol
                                join Co in bd.Colaboradores on us.IdUsuario equals Co.IdUsuario
                                join C in bd.Contrato on Co.IdColaborador equals C.IdColaborador
                                join DL in bd.DatosLaborales on C.IdContrato equals DL.IdContrato
                               select new RegistroVistaUsuario
                               {
                                   IdUsuario = us.IdUsuario,
                                   NombreColaborador = Co.NombresColaborador + " " + Co.ApellidosColaborador,
                                   CodigoColaborador = DL.CodigoColaborador,
                                   NombreUsuario = us.NombreUsuario,
                                   NombreRol = R.NombreRol
                               }).ToList();
                errorMessage = null;
                return true;
            }
            catch (Exception ex)
            {
                errorMessage = ex.Message;
                return false;
            }
        }
        #endregion
    }
}
