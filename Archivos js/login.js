document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('btnLogin');

    form.addEventListener('click', async function(e) {
        e.preventDefault(); // Evitar que el formulario se envíe normalmente

      

        const email = document.getElementById('txtEmail').value;
        const contraseña = document.getElementById('contraseña').value;
             
if(email.trim() === ""){
  alertaDefault('error','Debe ingresar un email');
  return;
}
if(contraseña.trim() === ""){
  alertaDefault('error','Debe ingresar una contraseña');
  return;
}

        const data = {
            email: email,
            contraseña: contraseña
          };

          try {
            const res = await fetch('../../backend/validar.php', {
                method: 'POST',
                body: JSON.stringify(data)
            });

            const result = await res.json();
            console.log(result);

            if (result.success) {
                
                alertaDefault('success','El usuario se encuentra en la base de datos')
                
                setTimeout(function() {
                    const email = encodeURIComponent(result.email);
                    const contraseña = encodeURIComponent(result.contraseña);
                    const id = encodeURIComponent(result.id);
                    const url = `../Archivos html/usuario.html?email=${email}&contraseña=${contraseña}&id=${id}`;
                    location.href = url;
                  }, 3000);
            } else{
                document.getElementById('txtEmail').select();
                alertaDefault('error','El usuario no se encuentra en la base de datos')
                return;
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    });
});

          
    

function alertaDefault(type,text){
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
  
  
    })
  }
  



















/*  fetch('../Archivos php/validar.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    if (result.success) {
      console.log(result.message);
      // Realiza cualquier acción adicional en JavaScript
       // Redirigir a otra página
       window.location.href = "../Archivos html/usuario.html";
    } else {
      console.error(result.message);
      // Realiza cualquier acción adicional en caso de error
    }
  })
  .catch(error => {
    console.error('Error en la solicitud:', error);
  });

*/