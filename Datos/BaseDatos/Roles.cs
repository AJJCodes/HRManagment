using System;
using System.Collections.Generic;

namespace Datos.BaseDatos;

public partial class Roles
{
    public int IdRol { get; set; }

    public bool? Activo { get; set; }

    public string? NombreRol { get; set; }

    public int? CreadoPor { get; set; }

    public int? ModificadoPor { get; set; }

    public virtual ICollection<Usuario> Usuario { get; set; } = new List<Usuario>();
}
