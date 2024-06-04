window.Componente = {
    UrlControlador: "/Personal/"
};



var table;



$('input[name="FechaInicioContrato"]').daterangepicker({
    singleDatePicker: true,
    showDropdowns: true,
    minYear: 1901,
    maxYear: parseInt(moment().format('YYYY'), 10)
}, function (start, end, label) {
    var years = moment().diff(start, 'years');
    alert("You are " + years + " years old!");
});


//Validaciones
$("#AgregarColaboradorYcontrato").validate({
    rules: {
        CodigoColaborador: {
            required: true,
            minlength: 3,
            maxlength: 100,
            remote: {
                url: Componente.UrlControlador + 'ValidarExistenciaCodigo',
                type: 'post',
                data: {
                    Codigo: function () {
                        return $('#CodigoColaborador').val();
                    }
                }
            }
        },
        NombresColaborador: {
            required: true,
            minlength: 1,
            maxlength: 100
        },
        ApellidosColaborador: {
            required: true,
            minlength: 1,
            maxlength: 100
        },
        SalarioColaborador: {
            required: true,
            min: 100,
        }
    },
    messages: {
        CodigoCuarto: {
            required: "Por favor ingrese un Codigo",
            minlength: "El Codigo del tiene que tener una longitud de minimo 3",
            maxlength: "El Codigo del tiene que tener una longitud maxima de  10 caracteres",
            remote: "Este codigo ya esta en uso"
        },
        NombresColaborador: {
            required: "Por Favor Ingrese los nombres Del Colaborador",
            minlength: "La longitud minima debe de ser 1 caracter",
            maxlength: "La longitud maxima debe de ser 100 caracteres"
        },
        ApellidosColaborador: {
            required: "Por favor Ingrese los apellidos Del Colaborador",
            minlength: "La longitud Mininma debe de ser 1 Caracter",
            maxlength: "La longitud Maxima debe de ser 100 Caracteres"
        },
        SalarioColaborador: {
            required: "Este Campo Es Requerido",
            min: "La Cantidad Minima aqui deberia de ser 100",
        }
    },
    highlight: function (element) {
        $(element).addClass('is-invalid').removeClass('is-valid');
    },
    unhighlight: function (element) {
        $(element).addClass('is-valid').removeClass('is-invalid');
    }
});


PoblarTablaColaboradores();

function PoblarTablaColaboradores() {
    // Verificar si ya existe una instancia de DataTables y destruirla si es necesario
    if ($.fn.DataTable.isDataTable('#TablaDeColavboradores')) {
        $('#TablaDeColavboradores').DataTable().destroy();
    }

    $.ajax({
        url: '/Personal/ObtenerListColaboradores',
        type: 'POST',
        success: function (response) {
            if (response.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.error
                });
                return;
            }

            table = $('#TablaDeColavboradores').DataTable({
                data: response.data, // Utiliza los datos recibidos en la respuesta AJAX
                columns: [
                    { data: 'codigoColaborador' },
                    { data: 'nombresColaborador' },
                    { data: 'salario' },
                    {
                        data: 'idColaborador',
                        render: function (data, type, row) {
                            return `
                                <div class="d-flex justify-content-between">
                                    <div class="btn-group">
                                        <button class="btn btn-primary editar-btn" data-idColaborador="${row.idColaborador}">
                                            <i class="las la-pencil-alt"></i>
                                        </button>

                                        <button class="btn btn-danger eliminar-btn" data-idColaborador="${row.idColaborador}">
                                            <i class="las la-trash-alt"></i>
                                        </button>
                                    </div>
                                </div>
                            `;
                        }
                    }
                ],
                order: [[0, 'asc']],
                responsive: true,
                dom: 'Bfrtip',
                searching: false,
                buttons: [
                    {
                        text: "Nuevo",
                        className: "btn btn-primary",
                        action: function (e, dt, node, config) {
                            $('#DivTablaColaboradores').hide(); // Ocultar el div de la tabla
                            $('#DivAgregarColaborador').show(); // Mostrar el div del formulario de agregar Colaborador
                        }
                    },
                    {
                        extend: 'csv'
                    },
                    {
                        extend: 'excel'
                    },
                    {
                        extend: 'pdf'
                    },
                    {
                        extend: 'print'
                    }
                ]
            });
        },
        error: function (xhr, status, error) {
            Swal.fire({
                icon: 'error',
                title: 'Error en la solicitud AJAX',
                text: error
            });
        }
    });
}


$('#cancelButton').click(function () {

    // Ocultar el div de agregar cliente
    $('#DivAgregarColaborador').hide();

    // Mostrar el div de la tabla de clientes
    $('#DivTablaColaboradores').show();

    // Limpiar el formulario
    $('#AgregarColaboradorYcontrato')[0].reset();
});


$('#AgregarColaboradorYcontrato').submit(function (event) {
    // Evita que el formulario se envíe automáticamente
    event.preventDefault();

    // Verifica si el formulario es válido utilizando jQuery Validation Plugin
    if ($('#AgregarColaboradorYcontrato').valid()) {
        var CodigoColaborador = $('#CodigoColaborador').val();
        var NombresColaborador = $('#NombresColaborador').val();
        var ApellidosColaborador = $('#ApellidosColaborador').val();
        var SalarioColaborador = $('#SalarioColaborador').val();
        var FechaInicioColaborador = $('#FechaInicioContrato').val();
        var FechFinColaborador = $('#FechaFinContrato').val();

        var DatosColab = {
            CodigoColaborador: CodigoColaborador,
            NombresColaborador: NombresColaborador,
            ApellidosColaborador: ApellidosColaborador,
            Salario: SalarioColaborador,
            FechaInicio: FechaInicioColaborador,
            FechaFin: FechFinColaborador
        };

        $.ajax({
            url: Componente.UrlControlador + 'AgregarColaboradorYcontrato',
            type: 'POST',
            data: DatosColab,
            success: function (response) {
                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'El Colaborador y contrato se agregaron exitosamente',
                        showConfirmButton: true, // Muestra el botón "OK"
                    }).then(function () {
                        $('#DivAgregarColaborador').hide();
                        $('#TablaDeColavboradores').DataTable().ajax.reload();
                        $('#DivTablaColaboradores').show();
                        // Limpiar el formulario
                        $('#AgregarColaboradorYcontrato')[0].reset();
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.error || 'Hubo un error al agregar el Colaborador y contrato'
                    });
                }
            },
            error: function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un error al enviar el formulario'
                });
            }
        });
    }
});

