$(function () {
    // Configuración de la función de autocompletado
    $("#autocomplete").autocomplete({
      source: async function (request, autocompleteResponse) {
        try {
          const searchTerm = request.term.toLowerCase();
  
          const response = await fetch('../../backend/autocomplete.php');
          const data = await response.json();
  
          const filteredData = data.filter(item =>
            item.id.toString().indexOf(searchTerm) !== -1 ||
            item.email.toLowerCase().indexOf(searchTerm) !== -1 ||
            item.contraseña.toLowerCase().indexOf(searchTerm) !== -1
          );
  
          const formattedData = filteredData.map(item => ({
            label: item.id + ' - ' + item.email + ' - ' + item.contraseña,
            value: item.email
          }));
  
          autocompleteResponse(formattedData); // Usamos autocompleteResponse en lugar de response
        } catch (error) {
          console.error('Error:', error);
        }
      }
    });
  });
  