using System;
using System.Collections.Generic;

namespace Web.BaseDatos;

public partial class SolicitudVacaciones
{
    public int IdSolicitudVacaciones { get; set; }

    public DateTime? FechaInicio { get; set; }

    public DateTime? FechaFin { get; set; }

    public double? CantDias { get; set; }

    public int? IdRegistroColaborador { get; set; }

    public virtual DatosLaborales? IdRegistroColaboradorNavigation { get; set; }
}
