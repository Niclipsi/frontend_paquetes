fetch('/componentes/index.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('header-container').innerHTML = data;
    actualizarBotones(); 
  });

function actualizarBotones() {
  const jwt = localStorage.getItem("token");
  const lupa = document.getElementById("lupa");
  const BotonUsuario = document.getElementById("boton-usuario");
  const carritoUsuario = document.getElementById("carrito-usuario");

  if (!lupa || !BotonUsuario || !carritoUsuario) return;

  if (jwt) {
       
    BotonUsuario.onclick = () => location.href = '/areas/6-historial-compras/index.html';
    carritoUsuario.onclick = () => location.href = '/areas/4-carrito-compras/index.html';
  } else {
    lupa.onclick = () => location.href = '/index.html';
    BotonUsuario.onclick = () => location.href = '/areas/8-Iniciar-secion/index.html';
    carritoUsuario.onclick = () => {
      alert("Para ver su carrito debe iniciar sesión.");
      location.href = '/areas/8-Iniciar-secion/index.html';
    };
  }
}

