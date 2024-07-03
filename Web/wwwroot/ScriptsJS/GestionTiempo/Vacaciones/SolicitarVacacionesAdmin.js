window.Componente = {
    UrlControlador: "/Vacaciones/"
};


//var cleave = new Cleave('#SalarioColaborador', {
//    numeral: true,
//    numeralThousandsGroupStyle: 'thousand'
//});


//Metodos de validacion personalizados
// Añadir método de validación personalizado




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

// Validaciones
//$("#AgregarColaboradorYcontrato").validate({
//    rules: {
//        CodigoColaborador: {
//            required: true,
//            minlength: 3,
//            maxlength: 100,
//            remote: {
//                url: Componente.UrlControlador + 'ValidarExistenciaCodigo',
//                type: 'post',
//                data: {
//                    Codigo: function () {
//                        return $('#CodigoColaborador').val();
//                    }
//                }
//            }
//        },
//        NombresColaborador: {
//            required: true,
//            minlength: 1,
//            maxlength: 100
//        },
//        ApellidosColaborador: {
//            required: true,
//            minlength: 1,
//            maxlength: 100
//        },
//        SalarioColaborador: {
//            required: true,
//            currency: true,
//        },
//        FechaInicioContrato: {
//            required: true,
//            dateLessThan: '#FechaFinContrato'
//        },
//        FechaFinContrato: {
//            dateGreaterThan: '#FechaInicioContrato'
//        },
//        ContraseñaUsuarioNuevo: {
//            required: true
//        },
//        NombreUsuarioNuevo: {
//            required: true,
//            minlength: 6,
//            maxlength: 100,
//            remote: {
//                url: Componente.UrlControlador + 'ValidarExistenciaUsuario',
//                type: 'post',
//                data: {
//                    Usuario: function () {
//                        return $('#NombreUsuarioNuevo').val();
//                    }
//                }
//            }
//        },
//    },
//    messages: {
//        CodigoColaborador: {
//            required: "Por favor ingrese un Código",
//            minlength: "El Código debe tener una longitud mínima de 3 caracteres",
//            maxlength: "El Código debe tener una longitud máxima de 100 caracteres",
//            remote: "Este código ya está en uso"
//        },
//        NombresColaborador: {
//            required: "Por favor ingrese los nombres del colaborador",
//            minlength: "La longitud mínima debe ser 1 carácter",
//            maxlength: "La longitud máxima debe ser 100 caracteres"
//        },
//        ApellidosColaborador: {
//            required: "Por favor ingrese los apellidos del colaborador",
//            minlength: "La longitud mínima debe ser 1 carácter",
//            maxlength: "La longitud máxima debe ser 100 caracteres"
//        },
//        SalarioColaborador: {
//            required: "Este campo es requerido",
//            currency: "Por favor, ingrese un salario válido mayor o igual a 100",
//        },
//        FechaInicioContrato: {
//            required: "Por favor ingrese la fecha de inicio del contrato",
//            dateLessThan: "La fecha de inicio debe ser menor que la fecha de fin"
//        },
//        FechaFinContrato: {
//            dateGreaterThan: "La fecha de fin debe ser mayor que la fecha de inicio"
//        },
//        ContraseñaUsuarioNuevo: {
//            required: "Este Campo es Requerido"
//        },
//        NombreUsuarioNuevo: {
//            required: "Campo Requerido",
//            minlength: "El Usuario debe tener una longitud mínima de 6 caracteres",
//            maxlength: "El Usuario debe tener una longitud máxima de 100 caracteres",
//            remote: "Este Usuario ya está en uso"
//        },
//    },
//    errorPlacement: function (error, element) {
//        // Coloca el mensaje de error en el contenedor invalid-feedback
//        error.addClass('invalid-feedback');
//        error.insertAfter(element.next('div.invalid-feedback'));
//    },
//    highlight: function (element) {
//        $(element).addClass('is-invalid').removeClass('is-valid');
//    },
//    unhighlight: function (element) {
//        $(element).addClass('is-valid').removeClass('is-invalid');
//    }
//});

PoblarTablaSolicitutes();

function PoblarTablaSolicitutes() {
    // Verificar si ya existe una instancia de DataTables y destruirla si es necesario
    if ($.fn.DataTable.isDataTable('#TablaSolicitudVacacionesAdmin')) {
        $('#TablaSolicitudVacacionesAdmin').DataTable().destroy();
    }

    $.ajax({
        url: Componente.UrlControlador + 'ObtenerlistaVacaciones',
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

            table = $('#TablaSolicitudVacacionesAdmin').DataTable({
                data: response.data, // Utiliza los datos recibidos en la respuesta AJAX
                columns: [
                    { data: 'codigoColaborador' },
                    { data: 'nombreColaborador' },
                    { data: 'fechaInicio' },
                    { data: 'fechaFin' },
                    { data: 'cantDias' },
                    {
                        data: 'idSolicitudVacaciones',
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
                        text: '<i class="las la-plus-circle"></i> Nuevo',
                        className: 'btn btn-primary btn-nuevo',
                        action: function (e, dt, node, config) {
                            $('#DivTablaSolicitudes').hide(); // Ocultar el div de la tabla
                            PoblarSelectPickerColaboradores();
                            $('#DivAgregarNuevaSolicitudAdmin').show(); // Mostrar el div del formulario de agregar Colaborador
                        }
                    },
                    {
                        extend: 'csv',
                        text: 'CSV',
                        className: 'btn btn-outline-secondary'
                    },
                    {
                        extend: 'excel',
                        text: 'Excel',
                        className: 'btn btn-outline-success'
                    },
                    {
                        extend: 'pdf',
                        text: 'PDF',
                        className: 'btn btn-outline-danger'
                    },
                    {
                        extend: 'print',
                        text: 'Imprimir',
                        className: 'btn btn-outline-info'
                    }
                ],
                language: {
                    url: '//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json'
                }
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

// Añadir estilos CSS personalizados
const style = document.createElement('style');
style.innerHTML = `
    .btn-nuevo {
        background-color: #00aaff;
        border-color: #0088cc;
        color: white;
    }
    .btn-nuevo:hover {
        background-color: #0088cc;
        border-color: #006699;
    }
    .btn-outline-secondary,
    .btn-outline-success,
    .btn-outline-danger,
    .btn-outline-info {
        color: #00aaff;
        border-color: #00aaff;
    }
    .btn-outline-secondary:hover,
    .btn-outline-success:hover,
    .btn-outline-danger:hover,
    .btn-outline-info:hover {
        background-color: #00aaff;
        color: white;
    }
`;
document.head.appendChild(style);




//$('#cancelButton').click(function () {

//    // Ocultar el div de agregar cliente
//    $('#DivAgregarColaborador').hide();

//    // Mostrar el div de la tabla de clientes
//    $('#DivTablaColaboradores').show();

//    // Limpiar el formulario
//    $('#AgregarColaboradorYcontrato')[0].reset();
//});


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
        var idRolNuevoUsuario = $('#RolNuevoUsuario').val();

        var DatosColab = {
            CodigoColaborador: CodigoColaborador,
            NombresColaborador: NombresColaborador,
            ApellidosColaborador: ApellidosColaborador,
            Salario: SalarioColaborador,
            FechaInicio: FechaInicioColaborador,
            FechaFin: FechFinColaborador,
            NombreUsuario: nombreUsuarioNuevo,
            Contraseña: contraseñaUsuarioNuevo,
            Idrol: idRolNuevoUsuario
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



//document.getElementById('togglePassword').addEventListener('click', function () {
//    const passwordField = document.getElementById('ContraseñaUsuarioNuevo');
//    const icon = document.getElementById('toggleIcon');

//    if (passwordField.type === 'password') {
//        passwordField.type = 'text';
//        icon.classList.remove('la-eye');
//        icon.classList.add('la-eye-slash');
//    } else {
//        passwordField.type = 'password';
//        icon.classList.remove('la-eye-slash');
//        icon.classList.add('la-eye');
//    }
//});


function PoblarSelectPickerColaboradores() {
    // Realizar la llamada AJAX para obtener los roles
    $.ajax({
        url: Componente.UrlControlador + 'ObtenerListaColaboradoresEquipo', // Ajusta la URL según sea necesario
        type: 'POST',
        success: function (response) {
            if (response.data) {
                var Colaboradores = response.data;
                var $select = $('#NuevaSolicitudColaborador');

                // Vaciar el select actual
                $select.empty();

                // Añadir la opción por defecto
                $select.append('<option selected>Seleccione Un Colaborador</option>');

                // Añadir las nuevas opciones
                $.each(Colaboradores, function (index, Colaborador) {
                    $select.append('<option value="' + Colaborador.idColaborador + '">' + Colaborador.codigoColaborador + " " + Colaborador.nombresColaborador + '</option>');
                });
            } else {
                console.error('Error:', response.error);
            }
        },
        error: function (xhr, status, error) {
            console.error('AJAX Error:', error);
        }
    });
}

