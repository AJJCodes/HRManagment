window.Componente = {
    UrlControlador: "/Personal/"
};


//Metodos de validacion personalizados
// Añadir método de validación personalizado
$.validator.addMethod("dateGreaterThan", function (value, element, params) {
    if (!value) {
        return true; // Permitir nulo
    }
    if (!/Invalid|NaN/.test(new Date(value))) {
        return new Date(value) > new Date($(params).val());
    }
    return isNaN(value) && isNaN($(params).val()) || (Number(value) > Number($(params).val()));
}, 'La fecha de fin debe ser mayor que la fecha de inicio.');

$.validator.addMethod("dateLessThan", function (value, element, params) {
    if (!value) {
        return false; // Fecha de inicio no debe ser nula
    }
    var endDate = $(params).val();
    if (!endDate) {
        return true; // Permitir nulo en fecha de fin
    }
    if (!/Invalid|NaN/.test(new Date(value)) && !/Invalid|NaN/.test(new Date(endDate))) {
        return new Date(value) < new Date(endDate);
    }
    return false;
}, 'La fecha de inicio debe ser menor que la fecha de fin.');





//Variables Globales
var table;



// Inicializar el campo FechaInicioContrato
$('input[name="FechaInicioContrato"]').daterangepicker({
    singleDatePicker: true,
    showDropdowns: true,
    minYear: 1901,
    maxYear: parseInt(moment().format('YYYY'), 10),
    locale: {
        format: 'YYYY-MM-DD'
    }
});

// Inicializar el campo FechaFinContrato
$('input[name="FechaFinContrato"]').daterangepicker({
    singleDatePicker: true,
    showDropdowns: true,
    autoUpdateInput: false, // No actualizar el campo de entrada automáticamente
    minYear: 1901,
    maxYear: parseInt(moment().format('YYYY'), 10),
    locale: {
        format: 'YYYY-MM-DD'
    }
});

// Limpiar el valor inicial del campo FechaFinContrato
$('input[name="FechaFinContrato"]').val('');

// Configurar el comportamiento cuando se selecciona una fecha en FechaFinContrato
$('input[name="FechaFinContrato"]').on('apply.daterangepicker', function (ev, picker) {
    $(this).val(picker.startDate.format('YYYY-MM-DD'));
});

$('input[name="FechaFinContrato"]').on('cancel.daterangepicker', function (ev, picker) {
    $(this).val('');
});
// Validaciones
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
        },
        FechaInicioContrato: {
            required: true,
            dateLessThan: '#FechaFinContrato'
        },
        FechaFinContrato: {
            dateGreaterThan: '#FechaInicioContrato'
        },
        ContraseñaUsuarioNuevo: {
            required: true
        },
        NombreUsuarioNuevo: {
            required: true,
            minlength: 6,
            maxlength: 100,
            remote: {
                url: Componente.UrlControlador + 'ValidarExistenciaUsuario',
                type: 'post',
                data: {
                    Usuario: function () {
                        return $('#NombreUsuarioNuevo').val();
                    }
                }
            }
        },
    },
    messages: {
        CodigoColaborador: {
            required: "Por favor ingrese un Código",
            minlength: "El Código debe tener una longitud mínima de 3 caracteres",
            maxlength: "El Código debe tener una longitud máxima de 100 caracteres",
            remote: "Este código ya está en uso"
        },
        NombresColaborador: {
            required: "Por favor ingrese los nombres del colaborador",
            minlength: "La longitud mínima debe ser 1 carácter",
            maxlength: "La longitud máxima debe ser 100 caracteres"
        },
        ApellidosColaborador: {
            required: "Por favor ingrese los apellidos del colaborador",
            minlength: "La longitud mínima debe ser 1 carácter",
            maxlength: "La longitud máxima debe ser 100 caracteres"
        },
        SalarioColaborador: {
            required: "Este campo es requerido",
            min: "La cantidad mínima aquí debería ser 100",
        },
        FechaInicioContrato: {
            required: "Por favor ingrese la fecha de inicio del contrato",
            dateLessThan: "La fecha de inicio debe ser menor que la fecha de fin"
        },
        FechaFinContrato: {
            dateGreaterThan: "La fecha de fin debe ser mayor que la fecha de inicio"
        },
        ContraseñaUsuarioNuevo: {
            required: "Este Campo es Requerido"
        },
        NombreUsuarioNuevo: {
            required: "Campo Requerido",
            minlength: "El Usuario debe tener una longitud mínima de 6 caracteres",
            maxlength: "El Usuario debe tener una longitud máxima de 100 caracteres",
            remote: "Este Usuario ya está en uso"
        },
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
        var contraseñaUsuarioNuevo = $('#ContraseñaUsuarioNuevo').val();
        var nombreUsuarioNuevo = $('#NombreUsuarioNuevo').val();

        var DatosColab = {
            CodigoColaborador: CodigoColaborador,
            NombresColaborador: NombresColaborador,
            ApellidosColaborador: ApellidosColaborador,
            Salario: SalarioColaborador,
            FechaInicio: FechaInicioColaborador,
            FechaFin: FechFinColaborador,
            NombreUsuario: nombreUsuarioNuevo,
            Contraseña: contraseñaUsuarioNuevo
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



document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('ContraseñaUsuarioNuevo');
    const icon = document.getElementById('toggleIcon');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        icon.classList.remove('la-eye');
        icon.classList.add('la-eye-slash');
    } else {
        passwordField.type = 'password';
        icon.classList.remove('la-eye-slash');
        icon.classList.add('la-eye');
    }
});

