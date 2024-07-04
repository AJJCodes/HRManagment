using Datos.BaseDatos;
using Modelo.Contratacion;
using Modelo.Gestion_Tiempo;
using Modelo.Nomina;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logica.Nomina
{
    public class Nomina_LN
    {
        private readonly Contexto bd;

        public Nomina_LN()
        {
            bd = new Contexto();
        }

        #region Consulta
        public bool ProporcionarListaVacaciones(ref List<RegistroNomina_VM> ListaNomina, out string? errorMessage)
        {
            try
            {
                // Utilizar LINQ para seleccionar los campos necesarios y mapearlos a Roles_VM
                ListaNomina = (from vc in bd.VacacionesAcumuladas
                                   join DL in bd.DatosLaborales on vc.IdDatosLaborales equals DL.IdRegistroDatosLaborales
                                   join Con in bd.Contrato on DL.IdContrato equals Con.IdContrato
                                   join Col in bd.Colaboradores on Con.IdColaborador equals Col.IdColaborador
                                   select new RegistroNomina_VM
                                   {
                                       IdRegistroVac = vc.IdregistroVac,
                                       NombreColaborador = Col.NombresColaborador + " " + Col.ApellidosColaborador,
                                       Salario = Con.Salario,
                                       CantVacDias = vc.CantVacDias,
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
        #endregion
    }
}
