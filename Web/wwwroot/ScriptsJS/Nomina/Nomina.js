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
                            return monto.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        }
                    }
                ],
                order: [[0, 'asc']],
                responsive: true,
                paging: false,
                dom: 'B',
                buttons: [
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
                    $('#totalMonto').html(totalMonto.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
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
