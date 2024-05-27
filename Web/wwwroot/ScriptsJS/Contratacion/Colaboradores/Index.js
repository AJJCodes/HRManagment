console.log("prueba");

var table;


PoblarTablaColaboradores();

function PoblarTablaColaboradores() {
    // Verificar si ya existe una instancia de DataTables y destruirla si es necesario
    if ($.fn.DataTable.isDataTable('#TablaDeColavboradores')) {
        table.destroy();
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
                    { data: 'Salario' }
                ],
                order: [[0, 'asc']],
                responsive: true,
                dom: 'Bfrtip'
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
