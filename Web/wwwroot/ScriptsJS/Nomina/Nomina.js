window.Componente = {
    UrlControlador: "/ReportesNomina/"
};

var table;

PoblarTablaNomina();
function PoblarTablaNomina() {
    // Verificar si ya existe una instancia de DataTables y destruirla si es necesario
    if ($.fn.DataTable.isDataTable('#TablaNomina')) {
        $('#TablaNomina').DataTable().destroy();
    }

    $.ajax({
        url: Componente.UrlControlador + 'ObtenerListaNomina',
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

            var totalMonto = 0;

            table = $('#TablaNomina').DataTable({
                data: response.data, // Utiliza los datos recibidos en la respuesta AJAX
                columns: [
                    { data: 'codigoColaborador' },
                    { data: 'nombreColaborador' },
                    { data: 'cantVacDias' },
                    { data: 'salario' },
                    {
                        data: null,
                        render: function (data, type, row) {
                            var monto = (row.salario / 30) * row.cantVacDias; // Cálculo del monto basado en el salario y los días
                            totalMonto += monto;
                            return monto.toFixed(2);
                        }
                    }
                ],
                order: [[0, 'asc']],
                responsive: true,
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'csvHtml5',
                        text: 'CSV',
                        className: 'btn btn-outline-secondary'
                    },
                    {
                        extend: 'excelHtml5',
                        text: 'Excel',
                        className: 'btn btn-outline-success'
                    },
                    {
                        extend: 'pdfHtml5',
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
                },
                drawCallback: function (settings) {
                    $('#totalMonto').html(totalMonto.toFixed(2));
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
