using Datos.BaseDatos;
using Modelo.Contratacion;
using Modelo.Seguridad;
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
                                  Salario = (float)Con.Salario
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

        public bool ProporcionaListaRoles(ref List<Roles_VM> ListaRoles, out string? errorMessage)
        {
            try
            {
                // Utilizar LINQ para seleccionar los campos necesarios y mapearlos a Roles_VM
                ListaRoles = (from Rol in bd.Roles
                              where Rol.Activo == true
                                      select new Roles_VM
                                      {
                                          IdRol = Rol.IdRol,
                                          NombreRol = Rol.NombreRol
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

        public bool VerificarExistenciaCodigo(string CodigoColab)
        {
            // Buscar el elemento en la tabla correspondiente
            var elemento = bd.DatosLaborales.FirstOrDefault(e => e.CodigoColaborador == CodigoColab);

            // Verificar si el elemento existe en la tabla
            if (elemento != null)
            {
                // El elemento ya existe en la tabla
                return true;
            }
            else
            {
                // El elemento no existe en la tabla
                return false;
            }
        }

        public bool VerificarExistenciaUsuario(string NombreUsuario)
        {
            // Buscar el elemento en la tabla correspondiente
            var elemento = bd.Usuario.FirstOrDefault(e => e.NombreUsuario == NombreUsuario && e.Activo == true);

            // Verificar si el elemento existe en la tabla
            if (elemento != null)
            {
                // El elemento ya existe en la tabla
                return true;
            }
            else
            {
                // El elemento no existe en la tabla
                return false;
            }
        }
        #endregion

        #region CRUD
        public bool AgregarColaboradorYcontrato(ColaboradoresYcontrato_VM e, out string? errorMessage)
        {
            using (var transaction = bd.Database.BeginTransaction())
            {
                try
                {
                    // Insertar en la tabla Colaboradores
                    var nuevoColaborador = new Colaboradores
                    {
                        NombresColaborador = e.NombresColaborador,
                        ApellidosColaborador = e.ApellidosColaborador
                    };
                    bd.Colaboradores.Add(nuevoColaborador);
                    bd.SaveChanges();

                    int colaboradorID = nuevoColaborador.IdColaborador;

                    // Insertar en la tabla Contratos
                    var nuevoContrato = new Contrato
                    {
                        IdColaborador = colaboradorID,
                        Salario = e.Salario,
                        FechaInicio = e.FechaInicio,
                        FechaFin = e.FechaFin
                    };
                    bd.Contrato.Add(nuevoContrato);
                    bd.SaveChanges();

                    int contratoID = nuevoContrato.IdContrato;

                    // Insertar en la tabla DatosLaborales
                    var nuevoDatosLaborales = new DatosLaborales
                    {
                        CodigoColaborador = e.CodigoColaborador,
                        EsActual = true,
                        EsNuevo = true,
                        IdContrato = contratoID,
                    };
                    bd.DatosLaborales.Add(nuevoDatosLaborales);
                    bd.SaveChanges();

                    var NuevoRegistroVacAcumulada = new VacacionesAcumuladas
                    {
                        CantVacDias = 0,
                        IdDatosLaborales = nuevoDatosLaborales.IdRegistroDatosLaborales
                    };
                    bd.VacacionesAcumuladas.Add(NuevoRegistroVacAcumulada);
                    bd.SaveChanges();

                    // Verificar si los parámetros @IdRol, @Usuario y @Contraseña no son nulos
                    if (e.Idrol.HasValue && !string.IsNullOrEmpty(e.NombreUsuario) && !string.IsNullOrEmpty(e.Contraseña))
                    {
                        // Crear un nuevo usuario
                        var nuevoUsuario = new Usuario
                        {
                            IdRol = e.Idrol.Value,
                            NombreUsuario = e.NombreUsuario,
                            Contraseña = e.Contraseña,
                            FechaCreacion = DateTime.Now,
                            Activo = true
                        };
                        bd.Usuario.Add(nuevoUsuario);
                        bd.SaveChanges();

                        // Actualizar el colaborador con el ID del usuario recién creado
                        nuevoColaborador.IdUsuario = nuevoUsuario.IdUsuario;
                        bd.Colaboradores.Update(nuevoColaborador);
                        bd.SaveChanges();
                    }
                    bd.SaveChanges();
                    // Confirmar la transacción
                    transaction.Commit();

                    errorMessage = null;  // No hay error, establecer el mensaje a null
                    return true;
                }
                catch (Exception ex)
                {
                    // Manejar errores y revertir la transacción
                    transaction.Rollback();
                    errorMessage = ex.Message;
                    return false;
                }
            }
        }

        #endregion
    }
}
