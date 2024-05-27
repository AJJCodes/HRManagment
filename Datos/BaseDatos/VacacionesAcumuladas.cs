using System;
using System.Collections.Generic;

namespace Datos.BaseDatos;

public partial class VacacionesAcumuladas
{
    public int IdregistroVac { get; set; }

    public double? CantVacDias { get; set; }

    public int? IdDatosLaborales { get; set; }

    public virtual DatosLaborales? IdDatosLaboralesNavigation { get; set; }
}
