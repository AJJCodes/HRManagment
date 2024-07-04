window.Componente = {
    UrlControlador: "/Vacaciones/"
};

var table;

var CantidadDiasDisponibles;
function ConseguirMisDiasAcumulados() {

    $.ajax({
        url: Componente.UrlControlador + 'ObtenerMisDiasAcumulados',
        type: 'POST',
        success: function (response) {
            if (response.data !== undefined && response.data !== null) {
                $('#CantidadDiasEnPosecion').val(response.data); // Muestra la cantidad de días en el input
                CantidadDiasDisponibles = response.data;
            } else if (response.error) {
                // Mostrar el mensaje de error usando SweetAlert2
                Swal.fire({
                    title: 'Error',
                    text: 'Error: ' + response.error,
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        },
        error: function (xhr, status, error) {
            // Mostrar el error en caso de fallo en la solicitud AJAX
            Swal.fire({
                title: 'Error',
                text: 'Error en la solicitud AJAX: ' + error,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    });
}

function ConseguirMisDatosColaborador() {

    $.ajax({
        url: Componente.UrlControlador + 'ObtenerMisDatosColaborador',
        type: 'POST',
        success: function (response) {
            if (response.data !== undefined && response.data !== null) {
                $('#NombreColaborador').val(response.data); // Muestra la cantidad de días en el input
            } else if (response.error) {
                // Mostrar el mensaje de error usando SweetAlert2
                Swal.fire({
                    title: 'Error',
                    text: 'Error: ' + response.error,
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        },
        error: function (xhr, status, error) {
            // Mostrar el error en caso de fallo en la solicitud AJAX
            Swal.fire({
                title: 'Error',
                text: 'Error en la solicitud AJAX: ' + error,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    });
}



$('#RangoFechasSolicitudVacPersonal').daterangepicker({
    format: 'DD/MM/YYYY',
    locale: {
        applyLabel: 'Aceptar',
        cancelLabel: 'Cancelar',
        fromLabel: 'De',
        toLabel: 'Hasta',
        daysOfWeek: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
        monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo",
            "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre",
            "Diciembre"],
        "firstDay": 1
    },
    ranges: {
        'Hoy': [moment(), moment()],
        'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Últimos 7 Días': [moment().subtract(6, 'days'), moment()],
        'Últimos 30 Días': [moment().subtract(29, 'days'), moment()],
        'Mes Actual': [moment().startOf('month'), moment().endOf('month')],
        'Último mes': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    minDate: moment(), // Restringe la selección a partir de hoy
}, function (start, end) {
    var cantidadDias = end.diff(start, 'days') + 1; // Calcula la cantidad de días
    $('#CantidaddiasSolicitado').val(cantidadDias); // Muestra la cantidad de días en el input
    DiasRestantes(cantidadDias);
    $('#DiasSolicitadosOcultos').val(cantidadDias); // Guarda la cantidad de días en el campo oculto
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
    if ($.fn.DataTable.isDataTable('#TablaSolicitudVacacionesPersonal')) {
        $('#TablaSolicitudVacacionesPersonal').DataTable().destroy();
    }

    $.ajax({
        url: Componente.UrlControlador + 'ObtenerlistaVacacionesPersonal',
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

            table = $('#TablaSolicitudVacacionesPersonal').DataTable({
                data: response.data, // Utiliza los datos recibidos en la respuesta AJAX
                columns: [
                    {
                        data: 'codigoColaborador',
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).addClass('text-center'); // Añade una clase CSS para centrar el contenido
                        }
                    },

                    {
                        data: 'nombreColaborador',
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).addClass('text-center'); // Añade una clase CSS para centrar el contenido
                        }
                    },
                    {
                        data: 'fechaInicio',
                        render: function (data, type, row) {
                            return moment(data).format('DD/MM/YYYY');
                        }
                    },
                    {
                        data: 'fechaFin',
                        render: function (data, type, row) {
                            return moment(data).format('DD/MM/YYYY');
                        }
                    },

                    {
                        data: 'cantDias',
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).addClass('text-center'); // Añade una clase CSS para centrar el contenido
                        }
                    },
                    {
                        data: 'idSolicitudVacaciones',
                        render: function (data, type, row) {
                            return `
            <div class="d-flex justify-content-between">
                <div class="btn-group">
                    <button class="btn btn-danger Eliminar-btn" data-idSolicitudVacaciones="${row.idSolicitudVacaciones}">
                        <i class="las la-trash"></i> Eliminar
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
                            $('#DivTablaSolicitudesPersonal').hide(); // Ocultar el div de la tabla
                            ConseguirMisDiasAcumulados();
                            ConseguirMisDatosColaborador();
                            PoblarSelectPickerTiposVacaciones();
                            $('#DivAgregarNuevaSolicitudPersonal').show(); // Mostrar el div del formulario de agregar Colaborador
                        }
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


$('#GuardarSolicitudVacacionPersonal').click(function () {
    var rangoFechas = $('#RangoFechasSolicitudVacPersonal').val(); // String de rango de fechas
    var fechas = rangoFechas.split(' - ');
    var fechaInicio = fechas[0];
    var fechaFin = fechas[1];
    var idTipoVacacion = $('#TipoVacacion').val();
    var descripcionvac = $('#DescripcionSolicitudVacacionPersonal').val();
    var CantidadDiasSolicitados = $('#CantidaddiasSolicitado').val();

    // Array para acumular mensajes de error
    var errores = [];

    // Validar campos
    if (!fechaInicio || !fechaFin) {
        errores.push("Las fechas de inicio y fin son obligatorias.");
    }
    if (!idTipoVacacion) {
        errores.push("El tipo de vacación es obligatorio.");
    }
    if (!descripcionvac) {
        errores.push("La descripción de la solicitud es obligatoria.");
    }
    if (!CantidadDiasSolicitados) {
        errores.push("La cantidad de días solicitados es obligatoria.");
    }

    // Mostrar los errores si existen
    if (errores.length > 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos Vacíos',
            text: errores.join(' ')
        });
    } else {
        // Verifica si el formulario es válido utilizando jQuery Validation Plugin

        var Solicitud = {
            IdTipoVacacion: idTipoVacacion,
            DescripcionVacaion: descripcionvac,
            FechaInicio: fechaInicio,
            FechaFin: fechaFin,
            CantDias: CantidadDiasSolicitados
        };

        $.ajax({
            url: Componente.UrlControlador + 'AgregarNuevaSolicitudPersonal',
            type: 'POST',
            data: Solicitud,
            success: function (response) {
                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'La solicitud se guardó exitosamente',
                        showConfirmButton: true, // Muestra el botón "OK"
                    }).then(function () {
                        $('#DivAgregarNuevaSolicitudPersonal').hide();
                        $('#TablaSolicitudVacacionesPersonal').DataTable().ajax.reload();
                        $('#DivTablaSolicitudesPersonal').show();
                        // Limpiar el formulario
                        $('#AgregarSolicitudVacacionPersonal')[0].reset();
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.error || 'Hubo un error al agregar la solicitud'
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


function PoblarSelectPickerTiposVacaciones() {
    // Realizar la llamada AJAX para obtener los roles
    $.ajax({
        url: Componente.UrlControlador + 'ObtenerListaTipoVacaciones', // Ajusta la URL según sea necesario
        type: 'POST',
        success: function (response) {
            if (response.data) {
                var TiposVacaciones = response.data;
                var $select = $('#TipoVacacion');

                // Vaciar el select actual
                $select.empty();

                // Añadir las nuevas opciones
                $.each(TiposVacaciones, function (index, TipoVac) {
                    $select.append('<option value="' + TipoVac.idTipoVacacion + '">' + TipoVac.nombreTipoVacacion + '</option>');
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

function DiasRestantes(DiasSolicitados) {
    ConseguirMisDiasAcumulados();
    var diasDisponiblesCrudo = CantidadDiasDisponibles
    var DiasDisponibles = parseFloat(diasDisponiblesCrudo);

    // Verificar que la conversión de días disponibles sea válida
    if (isNaN(DiasDisponibles)) {
        DiasDisponibles = 0;
    }

    // Calcular la cantidad de días restantes
    var diasRestantes = DiasDisponibles - DiasSolicitados;

    // Establecer el valor en el campo de "Cantidad de Días Restantes"
    $('#CantidaddiasRestantes').val(diasRestantes.toFixed(2));

    $('#DiasrestantesContainer').show();
}



// Manejar el evento de clic en el botón Rechazar
// Manejar el clic en el botón de rechazar
$('#TablaSolicitudVacacionesPersonal').on('click', '.Eliminar-btn', function () {
    var idSolicitud = $(this).data('idsolicitudvacaciones'); // Asegúrate de que el nombre coincida

    // Confirmar la acción con el usuario
    Swal.fire({
        title: '¿Está seguro?',
        text: "¿Desea eliminar esta solicitud?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Realizar la solicitud AJAX para eliminar la solicitud
            $.ajax({
                url: Componente.UrlControlador + 'RechazarSolicitud', // Reemplaza 'TuControlador' con el nombre de tu controlador
                type: 'POST',
                data: { Idsolicitud: idSolicitud },
                success: function (response) {
                    if (response.success) {
                        Swal.fire(
                            'Eliminado',
                            'La solicitud ha sido eliminada.',
                            'success'
                        );
                        // Recargar la tabla para reflejar los cambios
                        $('#TablaSolicitudVacacionesPersonal').DataTable().ajax.reload();
                    } else {
                        Swal.fire(
                            'Error',
                            response.error || 'Hubo un problema al eliminar la solicitud.',
                            'error'
                        );
                    }
                },
                error: function (xhr, status, error) {
                    Swal.fire(
                        'Error',
                        'Hubo un error en la solicitud AJAX: ' + error,
                        'error'
                    );
                }
            });
        }
    });
});






