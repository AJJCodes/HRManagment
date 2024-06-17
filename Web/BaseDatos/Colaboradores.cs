using System;
using System.Collections.Generic;

namespace Web.BaseDatos;

public partial class Colaboradores
{
    public int IdColaborador { get; set; }

    public string? NombresColaborador { get; set; }

    public string? ApellidosColaborador { get; set; }

    public int? IdUsuario { get; set; }

    public virtual ICollection<Contrato> Contrato { get; set; } = new List<Contrato>();

    public virtual Usuario? IdUsuarioNavigation { get; set; }
}
