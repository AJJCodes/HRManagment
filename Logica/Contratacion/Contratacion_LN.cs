using Datos.BaseDatos;
using Modelo.Contratacion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logica.Contratacion
{
    public  class Contratacion_LN
    {
        private readonly Contexto bd;

        public Contratacion_LN()
        {
            bd = new Contexto();
        }

        #region Consultas
        public bool ProporcionaListaColaboradores(ref List<ColaboradoresYcontrato_VM> ListaColaboradores, out string? errorMessage)
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
                                  NombresColaborador = Col.NombresColaborador +" "+ Col.ApellidosColaborador,
                                  Salario = Con.Salario
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

        #region CRUD

        #endregion
    }
}
