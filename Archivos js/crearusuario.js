
document.getElementById("btnUsuario").addEventListener("click", function(event) {
  event.preventDefault();

  let form = document.getElementById("myForm");
  let formData = new FormData(form);

  let email = formData.get("txtEmail");
  let contraseña = formData.get("contraseña");


if(email.trim() === ""){
  alertaDefault('error','Debe ingresar un email');
  return;
}
if(contraseña.trim() === ""){
  alertaDefault('error','Debe ingresar una contraseña');
  return;
}



  fetch("../Archivos php/ingreso.php", {
      method: "POST",
      body: formData
  })

  .then(function(response) {
      if (response.ok) {
          // El envío se ha completado correctamente

          alertaDefault('success','Usuario Creado');
          setTimeout(function() {
              window.location.href = "../Archivos php/tabla.php";
          }, 3001);
      }
  })
  .catch(function(error) {
      console.log(error);
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



    