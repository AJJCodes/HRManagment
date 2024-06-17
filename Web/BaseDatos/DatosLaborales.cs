using System;
using System.Collections.Generic;

namespace Web.BaseDatos;

public partial class DatosLaborales
{
    public int IdRegistroDatosLaborales { get; set; }

    public string? CodigoColaborador { get; set; }

    public bool? EsActual { get; set; }

    public bool? EsNuevo { get; set; }

    public int? IdContrato { get; set; }

    public virtual Contrato? IdContratoNavigation { get; set; }

    public virtual ICollection<SolicitudVacaciones> SolicitudVacaciones { get; set; } = new List<SolicitudVacaciones>();

    public virtual ICollection<VacacionesAcumuladas> VacacionesAcumuladas { get; set; } = new List<VacacionesAcumuladas>();
}
