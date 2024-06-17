using System;
using System.Collections.Generic;

namespace Web.BaseDatos;

public partial class RolesOpciones
{
    public int IdRol { get; set; }

    public int IdOpcion { get; set; }

    public string? DescripcionOpcion { get; set; }

    public virtual Opciones IdOpcionNavigation { get; set; } = null!;

    public virtual Roles IdRolNavigation { get; set; } = null!;
}
