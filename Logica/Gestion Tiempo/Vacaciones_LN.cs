﻿using Datos.BaseDatos;
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
        public bool ProporcionarListaVacaciones(int IdUsuario,ref List<VacacionesSolicitadas_VM> ListaVacaciones, out string? errorMessage)
        {
            try
            {
                // Utilizar LINQ para seleccionar los campos necesarios y mapearlos a Roles_VM
                ListaVacaciones = (from Sol in bd.SolicitudVacaciones
                                      join DL in bd.DatosLaborales on Sol.IdRegistroColaborador equals DL.IdRegistroDatosLaborales
                                      join Con in bd.Contrato on DL.IdContrato equals Con.IdContrato
                                      join Col in bd.Colaboradores on Con.IdColaborador equals Col.IdColaborador
                                   where Col.IdUsuario != IdUsuario && Sol.EstadoSolicitud == null
                                      select new VacacionesSolicitadas_VM
                                      {
                                          IdSolicitudVacaciones = Sol.IdSolicitudVacaciones,
                                          NombreColaborador = Col.NombresColaborador + " " + Col.ApellidosColaborador,
                                           FechaInicio = Sol.FechaInicio,
                                          FechaFin = Sol.FechaFin,
                                          CantDias = Sol.CantDias,
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

        public double ConseguirDiasAcumuladosXColaborador(int IdColaborador,ref string Mensaje)
        {
            try
            {
                // Utilizar LINQ para navegar desde Colaborador -> Contrato -> DatosLaborales -> VacacionesAcumuladas
                var cantidadAcumulada = (from col in bd.Colaboradores
                                         join con in bd.Contrato on col.IdColaborador equals con.IdColaborador
                                         join dl in bd.DatosLaborales on con.IdContrato equals dl.IdContrato
                                         join va in bd.VacacionesAcumuladas on dl.IdRegistroDatosLaborales equals va.IdDatosLaborales
                                         where col.IdColaborador == IdColaborador
                                         select va.CantVacDias).Sum();


                return cantidadAcumulada ?? 0;
            }
            catch (Exception ex)
            {
                Mensaje = ex.Message;
                return 0;
            }
        }

        public double ConseguirDiasAcumuladosPersonal(int IdUsuario, ref string Mensaje)
        {
            try
            {
                // Utilizar LINQ para navegar desde Colaborador -> Contrato -> DatosLaborales -> VacacionesAcumuladas
                var cantidadAcumulada = (from col in bd.Colaboradores
                                         join con in bd.Contrato on col.IdColaborador equals con.IdColaborador
                                         join dl in bd.DatosLaborales on con.IdContrato equals dl.IdContrato
                                         join va in bd.VacacionesAcumuladas on dl.IdRegistroDatosLaborales equals va.IdDatosLaborales
                                         where col.IdUsuario == IdUsuario
                                         select va.CantVacDias).Sum();


                return cantidadAcumulada ?? 0;
            }
            catch (Exception ex)
            {
                Mensaje = ex.Message;
                return 0;
            }
        }

        public string ConseguirMisDatosColaborador(int IdUsuario, ref string Mensaje)
        {
            try
            {
                string DatosColaborador;
                var datosLaborales = (from col in bd.Colaboradores
                                      join con in bd.Contrato on col.IdColaborador equals con.IdColaborador
                                      join dl in bd.DatosLaborales on con.IdContrato equals dl.IdContrato
                                      join va in bd.VacacionesAcumuladas on dl.IdRegistroDatosLaborales equals va.IdDatosLaborales
                                      where col.IdUsuario == IdUsuario
                                      select new
                                      {
                                          CodigoDL = dl.CodigoColaborador,
                                          NombresCol = col.NombresColaborador,
                                          ApellidosCol = col.ApellidosColaborador
                                      }).FirstOrDefault();
                DatosColaborador = datosLaborales.CodigoDL + " " + datosLaborales.NombresCol + " " + datosLaborales.ApellidosCol;

                return DatosColaborador;
            }
            catch (Exception ex)
            {
                Mensaje = ex.Message;
                return "Error";
            }
        }



        public bool ProporcionaListTipoVacacion(ref List<TipoVacacion_VM> ListaTipoVacacion, out string? errorMessage)
        {
            try
            {
                
                ListaTipoVacacion = (from TP in bd.TiposVacaciones
                                     where TP.EstadoTipoVacacion == true
                                      select new TipoVacacion_VM
                                      {
                                          IdTipoVacacion = TP.IdTipoVacacion,
                                          NombreTipoVacacion = TP.NombreTipoVacacion,
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

        #region Solicitud
        public bool AgregarNuevaSolicitudVacacion(VacacionesSolicitadas_VM Solicitud, out string? errorMessage)
        {
            using (var transaction = bd.Database.BeginTransaction())
            {
                try
                {

                    // Obtener el IdDatosLaborales usando el IdColaborador
                    var datosLaborales = (from col in bd.Colaboradores
                                          join con in bd.Contrato on col.IdColaborador equals con.IdColaborador
                                          join dl in bd.DatosLaborales on con.IdContrato equals dl.IdContrato
                                          join va in bd.VacacionesAcumuladas on dl.IdRegistroDatosLaborales equals va.IdDatosLaborales
                                          where col.IdColaborador == Solicitud.IdRegistroColaborador
                                          select new
                                          {
                                              IdDatosLaborales = dl.IdRegistroDatosLaborales
                                          }).FirstOrDefault();

                    // Insertar en la tabla Colaboradores
                    var  nuevaSolicitud = new SolicitudVacaciones
                    {
                        IdRegistroColaborador = datosLaborales.IdDatosLaborales,
                        CantDias = Solicitud.CantDias,
                        FechaInicio = Solicitud.FechaInicio,
                        FechaFin = Solicitud.FechaFin,
                        IdTipoVacacion = Solicitud.IdTipoVacacion,
                        CreadoPor = Solicitud.CreadoPor,
                        DescripcionVacacion = Solicitud.DescripcionVacaion
                    };
                    bd.SolicitudVacaciones.Add(nuevaSolicitud);

 
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
        public bool AutorizarVacacion(int IdSolicitud, int Idusuario, out string? errorMessage)
        {
            using (var transaction = bd.Database.BeginTransaction())
            {
                try
                {
                    // Buscar la solicitud existente en la base de datos
                    var solicitudExistente = bd.SolicitudVacaciones
                        .FirstOrDefault(s => s.IdSolicitudVacaciones == IdSolicitud);

                    // Verificar si se encontró la solicitud
                    if (solicitudExistente == null)
                    {
                        errorMessage = "Solicitud de vacaciones no encontrada.";
                        return false;
                    }


                    solicitudExistente.EstadoSolicitud = true;
                    solicitudExistente.AutorizadoPor = Idusuario;

                    //Buscamos Dias Acumulados
                    var DiasAcumuladosColaborador = bd.VacacionesAcumuladas.FirstOrDefault(s => s.IdDatosLaborales == solicitudExistente.IdRegistroColaborador);

                    DiasAcumuladosColaborador.CantVacDias -= solicitudExistente.CantDias;

                    // Guardar los cambios en la base de datos
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

        public bool RechazarSolicitud(int IdSolicitud, int Idusuario, out string? errorMessage)
        {
            using (var transaction = bd.Database.BeginTransaction())
            {
                try
                {
                    // Buscar la solicitud existente en la base de datos
                    var solicitudExistente = bd.SolicitudVacaciones
                        .FirstOrDefault(s => s.IdSolicitudVacaciones == IdSolicitud);

                    // Verificar si se encontró la solicitud
                    if (solicitudExistente == null)
                    {
                        errorMessage = "Solicitud de vacaciones no encontrada.";
                        return false;
                    }


                    solicitudExistente.EstadoSolicitud = false;
                    solicitudExistente.RechazadoPor = Idusuario;
                    

                    // Guardar los cambios en la base de datos
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

        #region Consultas Individuo
        public bool ProporcionarListaVacacionesPersonal(int IdUsuario, ref List<VacacionesSolicitadas_VM> ListaVacaciones, out string? errorMessage)
        {
            try
            {
                // Utilizar LINQ para seleccionar los campos necesarios y mapearlos a Roles_VM
                ListaVacaciones = (from Sol in bd.SolicitudVacaciones
                                   join DL in bd.DatosLaborales on Sol.IdRegistroColaborador equals DL.IdRegistroDatosLaborales
                                   join Con in bd.Contrato on DL.IdContrato equals Con.IdContrato
                                   join Col in bd.Colaboradores on Con.IdColaborador equals Col.IdColaborador
                                   where Col.IdUsuario == IdUsuario && Sol.EstadoSolicitud == null
                                   select new VacacionesSolicitadas_VM
                                   {
                                       IdSolicitudVacaciones = Sol.IdSolicitudVacaciones,
                                       NombreColaborador = Col.NombresColaborador + " " + Col.ApellidosColaborador,
                                       FechaInicio = Sol.FechaInicio,
                                       FechaFin = Sol.FechaFin,
                                       CantDias = Sol.CantDias,
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

        #region SolicitutesIndividuo
        public bool AgregarNuevaSolicitudVacacionPersonal(VacacionesSolicitadas_VM Solicitud, out string? errorMessage)
        {
            using (var transaction = bd.Database.BeginTransaction())
            {
                try
                {

                    // Obtener el IdDatosLaborales usando el IdUsuario
                    var datosLaborales = (from col in bd.Colaboradores
                                          join con in bd.Contrato on col.IdColaborador equals con.IdColaborador
                                          join dl in bd.DatosLaborales on con.IdContrato equals dl.IdContrato
                                          join va in bd.VacacionesAcumuladas on dl.IdRegistroDatosLaborales equals va.IdDatosLaborales
                                          where col.IdUsuario == Solicitud.IdRegistroColaborador
                                          select new
                                          {
                                              IdDatosLaborales = dl.IdRegistroDatosLaborales
                                          }).FirstOrDefault();

                    // Insertar en la tabla Colaboradores
                    var nuevaSolicitud = new SolicitudVacaciones
                    {
                        IdRegistroColaborador = datosLaborales.IdDatosLaborales,
                        CantDias = Solicitud.CantDias,
                        FechaInicio = Solicitud.FechaInicio,
                        FechaFin = Solicitud.FechaFin,
                        IdTipoVacacion = Solicitud.IdTipoVacacion,
                        CreadoPor = Solicitud.CreadoPor,
                        DescripcionVacacion = Solicitud.DescripcionVacaion
                    };
                    bd.SolicitudVacaciones.Add(nuevaSolicitud);


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
