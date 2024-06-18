using System;
using System.Collections.Generic;

namespace Datos.BaseDatos;

public partial class Opciones
{
    public int IdOpcion { get; set; }

    public string NombreOpcion { get; set; } = null!;

    public string? UrlOpcion { get; set; }

    public string? Icono { get; set; }

    public virtual ICollection<RolesOpciones> RolesOpciones { get; set; } = new List<RolesOpciones>();

    public virtual ICollection<Opciones> IdOpcionHijo { get; set; } = new List<Opciones>();

    public virtual ICollection<Opciones> IdOpcionPadre { get; set; } = new List<Opciones>();
}
