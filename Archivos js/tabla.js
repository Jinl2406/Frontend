async function insertarDatosEnTabla() {
  try {
    const response = await fetch('../../backend/tabla.php');
    const datos = await response.json();

    const tableBody = document.querySelector('#example1 tbody');

    tableBody.innerHTML = '';

    datos.forEach(dato => {
      const row = document.createElement('tr');

      const idCell = document.createElement('td');
      idCell.textContent = dato.id;
      row.appendChild(idCell);

      const emailCell = document.createElement('td');
      emailCell.textContent = dato.email;
      row.appendChild(emailCell);

      const contraseñaCell = document.createElement('td');
      contraseñaCell.textContent = dato.contraseña;
      row.appendChild(contraseñaCell);

      tableBody.appendChild(row);
    });

    // Inicializar DataTables
    $("#example1").DataTable({
      "responsive": true,
      "lengthChange": false,
      "autoWidth": false,
      "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');

  } catch (error) {
    console.log('Error al obtener los datos:', error);
  }
}

insertarDatosEnTabla();
