document.getElementById("btnUsuario").addEventListener("click", function(event) {
  event.preventDefault();

  let emailInput = document.getElementById("txtEmail");
  let email = emailInput.value;

  let contraseñaInput = document.getElementById("contraseña");
  let contraseña = contraseñaInput.value;

  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    alertaDefault('error', 'Email inválido');
    return;
  }

  if (email.trim() === "") {
    alertaDefault('error', 'Debe ingresar un email');
    return;
  }

  if (contraseña.trim() === "") {
    alertaDefault('error', 'Debe ingresar una contraseña');
    return;
  }

  // Validar la contraseña
  let contraseñaRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  if (!contraseñaRegex.test(contraseña)) {
    alertaDefault('error', 'La contraseña debe tener al menos 6 caracteres y contener al menos una letra minúscula y una letra mayúscula.');
    return;
  }

  // Resto del código...

  fetch("../../backend/ingreso.php", {
      method: "POST",
      body: new FormData(document.getElementById("myForm"))
  })
  .then(function(response) {
      if (response.ok) {
          // El envío se ha completado correctamente

          alertaDefault('success','Usuario Creado');
          setTimeout(function() {
              window.location.href = "../Archivos html/tabla.html";
          }, 3001);
      }
  })
  .catch(function(error) {
      console.log(error);
  });
});

function alertaDefault(type, text) {
  Swal.fire({
    text: text,
    target: '#custom-target',
    customClass: {
      container: 'position-absolute',
    },
    toast: true,
    position: 'top-end',
    icon: type,
    showConfirmButton: false,
    timer: 3000
  });
}
