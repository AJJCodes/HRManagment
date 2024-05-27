var table;


window.Componente = {
    UrlControlador: "/Personal/"
};

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

            console.log('Datos recibidos:', response.data);

            table = $('#TablaDeColavboradores').DataTable({
                data: response.data, // Utiliza los datos recibidos en la respuesta AJAX
                columns: [
                    { data: 'CodigoColaborador' },
                    { data: 'NombresColaborador' },
                    { data: 'Salario' },
                    {
                        "data": "IdColaborador",
                        "render": function (data, type, row) {
                            return `
                    <div class="d-flex justify-content-between">
                        <div class="btn-group">
                            <button class="btn btn-primary editar-btn" data-idColaborador="${row.IdColaborador}">
                                <i class="fas fa-pencil-alt"></i>
                            </button>

                            <button class="btn btn-danger eliminar-btn" data-idColaborador="${row.IdColaborador}">
                                <i class="fas fa-trash-alt"></i>
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
        // Realiza aquí la lógica que deseas ejecutar al enviar el formulario

        // Ejemplo de llamada a la función "AgregarClienteyContrato" en tu controlador:
        $.ajax({
            url: Componente.UrlControlador + 'AgregarClienteyContrato',
            type: 'POST',
            data: $(this).serialize(),
            success: function (response) {
                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'El cliente y contrato se agregaron exitosamente',
                        showConfirmButton: true, // Muestra el botón "OK"
                    }).then(function () {
                        $('#DivAgregarCliente').hide();
                        $('#TablaDeCliente').DataTable().ajax.reload();
                        $('#DivTablaCliente').show();
                        // Limpiar el formulario
                        $('#AgregarClienteyContratoForm')[0].reset();
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un error al agregar el cliente y contrato'
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
