const BotonSesion = document.getElementById("registrarse-usuario");
const BotonUsuario = document.getElementById("boton-usuario");
const carritoUsuario = document.getElementById("carrito-usuario");

function actualizarBotones() {
    const jwt = localStorage.getItem("token");    
    
    if(jwt){
        BotonSesion.innerHTML = "cerrar sesión";
        BotonSesion.onclick = () =>{
            localStorage.removeItem("token");
            localStorage.removeItem("usuario");
            window.location.reload();
        };       
    }
}
actualizarBotones();