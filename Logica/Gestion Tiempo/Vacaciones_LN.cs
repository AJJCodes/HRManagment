using Datos.BaseDatos;
using Modelo.Contratacion;
using Modelo.Gestion_Tiempo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logica.Gestion_Tiempo
{
    public  class Vacaciones_LN
    {

        private readonly Contexto bd;

        public Vacaciones_LN()
        {
            bd = new Contexto();
        }

        #region Consultas
        public bool ProporcionarListaVacaciones(ref List<VacacionesSolicitadas_VM> ListaVacaciones, out string? errorMessage)
        {
            try
            {
                // Utilizar LINQ para seleccionar los campos necesarios y mapearlos a Roles_VM
                ListaVacaciones = (from Sol in bd.SolicitudVacaciones
                                      join DL in bd.DatosLaborales on Sol.IdRegistroColaborador equals DL.IdRegistroDatosLaborales
                                      join Con in bd.Contrato on DL.IdContrato equals Con.IdContrato
                                      join Col in bd.Colaboradores on Con.IdColaborador equals Col.IdColaborador
                                      select new VacacionesSolicitadas_VM
                                      {
                                          FechaInicio = Sol.FechaInicio,
                                          FechaFin = Sol.FechaFin,
                                          CantDias = Sol.CantDias,
                                          IdSolicitudVacaciones = Sol.IdSolicitudVacaciones,
                                          NombreColaborador = Col.NombresColaborador + " " + Col.ApellidosColaborador,
                                          CodigoColaborador = DL.CodigoColaborador
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

        public bool ProporcionaListaColaboradoresMiEquipo(ref List<ColaboradoresYcontrato_VM> ListaColaboradores, out string? errorMessage)
        {
            try
            {
                // Utilizar LINQ para seleccionar los campos necesarios y mapearlos a Roles_VM
                ListaColaboradores = (from Col in bd.Colaboradores
                                      join Con in bd.Contrato on Col.IdColaborador equals Con.IdColaborador
                                      join DL in bd.DatosLaborales on Con.IdContrato equals DL.IdContrato
                                      select new ColaboradoresYcontrato_VM
                                      {
                                          IdColaborador = Col.IdColaborador,
                                          CodigoColaborador = DL.CodigoColaborador,
                                          NombresColaborador = Col.NombresColaborador + " " + Col.ApellidosColaborador,
                                      }).ToList();
                errorMessage = null;  // No hay error, establecer el mensaje a null
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
