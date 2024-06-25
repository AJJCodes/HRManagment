
    var data = [
        {
            codigoColaborador: 'COD001',
            nombreCompleto: 'Juan Pérez',
            desde: '2024-07-01',
            hasta: '2024-07-05',
            cantidadDias: 5
        },
        {
            codigoColaborador: 'COD002',
            nombreCompleto: 'María López',
            desde: '2024-07-10',
            hasta: '2024-07-15',
            cantidadDias: 6
        },
        {
            codigoColaborador: 'COD003',
            nombreCompleto: 'Pedro González',
            desde: '2024-07-20',
            hasta: '2024-07-25',
            cantidadDias: 6
        }
    ];

    // Inicializar la tabla utilizando DataTables
    var tabla = new DataTable('#TablaSolicitudVacacionesAdmin', {
        data: data, // Asignar los datos de ejemplo al DataTable
        columns: [
            { data: 'codigoColaborador' },
            { data: 'nombreCompleto' },
            { data: 'desde' },
            { data: 'hasta' },
            { data: 'cantidadDias' },
            {
                data: null,
                render: function (data, type, row) {
                    // Renderizar los botones de acciones con los iconos
                    return `
                        <button class="btn btn-success"><i class="las la-check"></i></button>
                        <button class="btn btn-danger"><i class="las la-times"></i></button>
                    `;
                }
            }

        ],
        order: [[0, 'asc']],
        responsive: true,
        dom: 'Bfrtip',
        searching: false,
        paging: true,
        pageLength: 10, // Número de filas por página
        buttons: [
            {
                text: "Nuevo",
                className: "btn btn-primary",
                action: function (e, dt, node, config) {
                    $('#DivTablaSolicitudes').hide(); // Ocultar el div de la tabla
                    $('#DivAgregarNuevaSolicitud').show(); // Mostrar el div del formulario de agregar Colaborador
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

