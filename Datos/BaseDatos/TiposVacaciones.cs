using System;
using System.Collections.Generic;

namespace Datos.BaseDatos;

public partial class TiposVacaciones
{
    public int IdTipoVacacion { get; set; }

    public string? NombreTipoVacacion { get; set; }

    public string? DescripcionTipoVacacion { get; set; }

    public bool? EstadoTipoVacacion { get; set; }

    public virtual ICollection<SolicitudVacaciones> SolicitudVacaciones { get; set; } = new List<SolicitudVacaciones>();
}
