using System;
using System.Collections.Generic;

namespace Datos.BaseDatos;

public partial class Usuario
{
    public int IdUsuario { get; set; }

    public string? NombreUsuario { get; set; }

    public string? Contraseña { get; set; }

    public DateTime? FechaCreacion { get; set; }

    public bool? Activo { get; set; }

    public int? IdRol { get; set; }

    public virtual ICollection<Colaboradores> Colaboradores { get; set; } = new List<Colaboradores>();

    public virtual Roles? IdRolNavigation { get; set; }

    public virtual ICollection<SolicitudVacaciones> SolicitudVacaciones { get; set; } = new List<SolicitudVacaciones>();
}
