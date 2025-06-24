fetch('/componentes/header.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('header-container').innerHTML = data;
    actualizarBotones(); 
  });

function actualizarBotones() {
  const jwt = localStorage.getItem("token");
  const BotonSesion = document.getElementById("registrarse-usuario");
  const BotonUsuario = document.getElementById("boton-usuario");
  const carritoUsuario = document.getElementById("carrito-usuario");

  if (!BotonSesion || !BotonUsuario || !carritoUsuario) return;

  if (jwt) {
       
    BotonUsuario.onclick = () => location.href = '/areas/6-historial-compras/index.html';
    carritoUsuario.onclick = () => location.href = '/areas/4-carrito-compras/index.html';
  } else {
    BotonSesion.textContent = "registrarse";
    BotonSesion.onclick = () => location.href = '/areas/7-crear-cuenta/index.html';
    BotonUsuario.onclick = () => location.href = '/areas/8-Iniciar-secion/index.html';
    carritoUsuario.onclick = () => {
      alert("Para ver su carrito debe iniciar sesión.");
      location.href = '/areas/8-Iniciar-secion/index.html';
    };
  }
}