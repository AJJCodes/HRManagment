using System;
using System.Collections.Generic;

namespace Datos.BaseDatos;

public partial class SolicitudVacaciones
{
    public int IdSolicitudVacaciones { get; set; }

    public DateTime? FechaInicio { get; set; }

    public DateTime? FechaFin { get; set; }

    public double? CantDias { get; set; }

    public int? IdRegistroColaborador { get; set; }

    public int? IdTipoVacacion { get; set; }

    public bool? EstadoSolicitud { get; set; }

    public int? AutorizadoPor { get; set; }

    public int? RechazadoPor { get; set; }

    public string? DescripcionRechazo { get; set; }

    public int? CreadoPor { get; set; }

    public string? DescripcionVacacion { get; set; }

    public virtual Usuario? CreadoPorNavigation { get; set; }

    public virtual DatosLaborales? IdRegistroColaboradorNavigation { get; set; }

    public virtual TiposVacaciones? IdTipoVacacionNavigation { get; set; }
}
