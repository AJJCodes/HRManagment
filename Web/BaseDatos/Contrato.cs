using System;
using System.Collections.Generic;

namespace Web.BaseDatos;

public partial class Contrato
{
    public int IdContrato { get; set; }

    public DateTime? FechaInicio { get; set; }

    public DateTime? FechaFin { get; set; }

    public double? Salario { get; set; }

    public int? IdColaborador { get; set; }

    public virtual ICollection<DatosLaborales> DatosLaborales { get; set; } = new List<DatosLaborales>();

    public virtual Colaboradores? IdColaboradorNavigation { get; set; }
}
