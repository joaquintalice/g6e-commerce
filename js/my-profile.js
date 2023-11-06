window.onload = function () {
    if (!verificarSesion()) {
      // Redirigir a la página de inicio de sesión si el usuario no ha iniciado sesión
      window.location.href = "login.html";
    }
  };
  
  
  // Obtener y mostrar el nombre de usuario almacenado
  const storedUsername = localStorage.getItem('usuario');
  const usernameDisplay = document.getElementById('usuario-prueba');

  if (storedUsername) {
    usernameDisplay.textContent = `${storedUsername}`;
  }

 // Cargar el nombre de usuario desde localStorage
 document.getElementById('inputEmail').value = localStorage.getItem('usuario') || '';

 // Cargar el resto de la información del usuario si está disponible
 const loadUserProfile = () => {
   const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
   document.getElementById('inputNombre').value = userProfile.nombre || '';
   document.getElementById('inputSegundoNombre').value = userProfile.segundoNombre || '';
   document.getElementById('inputApellido').value = userProfile.apellido || '';
   document.getElementById('inputSegundoApellido').value = userProfile.segundoApellido || '';
   document.getElementById('inputTelefono').value = userProfile.telefono || '';
 };

 // Guardar información del perfil del usuario
 document.getElementById('profileForm').addEventListener('submit', function(event) {
   event.preventDefault();
   const userProfile = {
     nombre: document.getElementById('inputNombre').value,
     segundoNombre: document.getElementById('inputSegundoNombre').value,
     apellido: document.getElementById('inputApellido').value,
     segundoApellido: document.getElementById('inputSegundoApellido').value,
     email: document.getElementById('inputEmail').value,
     telefono: document.getElementById('inputTelefono').value,
     imgProfile: document.getElementById('imagenPerfil').value,
   };

   // Almacenar los datos del usuario
   localStorage.setItem('userProfile', JSON.stringify(userProfile));
   alert('Cambios guardados correctamente.');
 });

 // Cargar datos del usuario al cargar la página
 loadUserProfile();


// Agregar un event listener para el formulario y realizar la validación 
document.getElementById('profileForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevenir el envío por defecto del formulario

  // Obtener valores de los campos
  const nombre = document.getElementById('inputNombre').value.trim();
  const apellido = document.getElementById('inputApellido').value.trim();
  const email = document.getElementById('inputEmail').value.trim();

  // Validar campos obligatorios
  if (nombre === '' || apellido === '' || email === '') {
    alert('Por favor, complete los campos obligatorios (*)');
    return; // Detener el proceso si los campos obligatorios no están completos
  }
});

////////////////////////////////////////////////////////////////////////////////////

function guardarFoto() {
  const fileInput = document.getElementById('fileInput');
  const imagenPerfil = document.getElementById('imagenPerfil');

  const file = fileInput.files[0];
  if (file) {
      const reader = new FileReader();

      reader.onload = function(event) {
          // Muestra la imagen cargada
          imagenPerfil.src = event.target.result;

          // Guarda la imagen en localStorage
          localStorage.setItem('imagenPerfil', event.target.result);
          // También podrías enviarla al servidor usando AJAX o fetch
      };

      reader.readAsDataURL(file);
  }
}

// Al cargar la página, comprueba si hay una imagen guardada en localStorage
window.onload = function() {
  const imagenPerfil = document.getElementById('imagenPerfil');
  const imagenGuardada = localStorage.getItem('imagenPerfil');
  if (imagenGuardada) {
      imagenPerfil.src = imagenGuardada;
  }
};