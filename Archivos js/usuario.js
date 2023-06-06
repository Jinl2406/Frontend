document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const contraseña = urlParams.get('contraseña');
    const id = urlParams.get('id');
  
    // Mostrar los datos en los elementos HTML
    document.getElementById('email').textContent = email;
    document.getElementById('contraseña').textContent = contraseña;
    document.getElementById('id').textContent = id;
  });
  