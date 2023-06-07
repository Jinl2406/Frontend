// Función para mostrar los datos en la tabla
function showData(data) {
  $("#example1 tbody").empty(); // Vaciar el contenido de la tabla

  $.each(data, function (index, item) {
    var row = $("<tr></tr>");
    row.append($("<td></td>").text(item.id));
    row.append($("<td></td>").text(item.email));
    row.append($("<td></td>").text(item.contraseña));
    $("#example1 tbody").append(row);
  });
}

// Función para obtener los datos del servidor utilizando fetch
async function fetchData() {
  try {
    const response = await fetch('../Archivos php/tabla.php');
    const data = await response.json();

    showData(data); // Mostrar los datos en la tabla
  } catch (error) {
    console.error('Error:', error);
  }
}

$(function () {
  fetchData(); // Obtener y mostrar los datos en la tabla

  // Configuración de la función de autocompletado
  $("#tags").autocomplete({
    source: function (request, response) {
      $.ajax({
        url: "../Archivos php/autocomplete.php",
        dataType: "json",
        data: {
          term: request.term
        },
        success: function (data) {
          response($.map(data, function (item) {
            return {
              label: item.id + ' - ' + item.email + ' - ' + item.contraseña,
              value: item.email
            };
          }));
        }
      });
    },
    minLength: 1 // Establecer la longitud mínima de caracteres para activar el autocompletado
  });


  // Inicialización del DataTable
  $("#example1").DataTable({
    "responsive": true,
    "lengthChange": false,
    "autoWidth": false,
    "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],
    "initComplete": function () {
      fetchData(); // Obtener y mostrar los datos en la tabla
    },
  }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
});


