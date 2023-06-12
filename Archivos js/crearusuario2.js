document.getElementById("btnUsuario").addEventListener("click", function(event) {
    event.preventDefault();
  
    Swal.fire({
      title: 'Ingrese su email y contraseña',
      html:
        '<form id="myForm">'+
        '<input id="emailInput" name="emailInput" class="swal2-input" placeholder="Email" type="text" autocapitalize="off">' +
        '<input id="passwordInput" name="passwordInput" class="swal2-input" placeholder="Contraseña" type="password" autocapitalize="off">'+
        '</form>',
      confirmButtonText: 'Crear usuario',
      showLoaderOnConfirm: false,
      preConfirm: () => {
        return new Promise((resolve, reject) => {
          const email = document.getElementById('emailInput').value;
          const password = document.getElementById('passwordInput').value;
  
          if (email.trim() === "") {
            reject(new Error('Debe ingresar un email'));
            return;
          }
  
          if (password.trim() === "") {
            reject(new Error('Debe ingresar una contraseña'));
            return;
          }
  
          let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailRegex.test(email)) {
            reject(new Error('Email inválido'));
            return;
          }
  
          let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
          if (!passwordRegex.test(password)) {
            reject(new Error('La contraseña debe tener al menos 6 caracteres y contener al menos una letra minúscula y una letra mayúscula.'));
            return;
          }
  
          const formData = new FormData();
          formData.append('emailInput', email);
          formData.append('passwordInput', password);
  
          // Verificar en el servidor
          fetch("../../backend/crearusuario.php", {
            method: "POST",
            body: formData
          })
          .then(function(response) {
            if (response.ok) {
              resolve(); // Continuar con el proceso de envío de los datos a la base de datos
            } else {
              throw new Error('El usuario ya esta registrado');
            }
          })
          .catch(function(error) {
            reject(error);
          });
        });
      },
    allowOutsideClick: true,
    showCancelButton: true,
    cancelButtonText: 'Cancelar'
    })
    .then((result) => {
      if (result.isConfirmed){
      // Continuar con el proceso de envío de los datos a la base de datos
      const formData = new FormData(document.getElementById("myForm"));
      fetch("../../backend/crearusuario.php", {
        method: "POST",
        body: formData
      })
      .then(function(response) {
        if (response.ok) {
          // El envío se ha completado correctamente
          alertaDefault('success', 'Usuario Creado');
          setTimeout(function() {
            window.location.href = "../Archivos html/tabla.html";
          }, 3001);
        } else {
          throw new Error('Error al enviar los datos');
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    }
    })
    .catch(error => {
      Swal.fire('Error', error.message, 'error');
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
  