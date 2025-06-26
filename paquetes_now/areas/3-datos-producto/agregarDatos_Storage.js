import {mostrarD} from "../3-datos-producto/mostrarDatos.js";
mostrarD();
let datos = [];
const botonComprar = document.getElementById("botonComprar");
window.addEventListener("DOMContentLoaded",async function(){
        
    if(botonComprar){
        botonComprar.addEventListener('click', () => (confirmar()));
    }    
    else{
        console.log("no se encuentra el boton")
    }
    cargar();   
});
 
 function GuardarLocal() {    
    localStorage.setItem("carrito",JSON.stringify(datos));
}
function cargar(){
    let guardar = localStorage.getItem("carrito");
    if(guardar){
        datos = JSON.parse(guardar);
    }
} 

function confirmar() { 
    const jwt = localStorage.getItem("token");
    if(jwt){
        
    try {
    const id = parseFloat(localStorage.getItem("MostrarDatosID"));
    const cantidadT = parseFloat(localStorage.getItem("precioTpaquete"));
    const nombre = document.getElementById("nombre").textContent;
    const precio = document.getElementById("Sprecio").textContent;
    const inputC = document.getElementById("inputC").value;
    const figure  = document.getElementById("contenedor-id");
console.log("Cantidad ingresada:", inputC); 
 if(!isNaN(inputC) && inputC > 0){   
    const index = datos.findIndex(item => item.id === id); 
    if(index !== -1){
        datos[index].cantidad = parseInt(datos[index].cantidad) + parseInt(inputC);
        datos[index].cantidadT = datos[index].cantidad * precio;
    }else{
    const item = {
        nombre: nombre,
        precio: precio,
        cantidad: inputC,
        cantidadT: cantidadT,   
        id: id    
    };
    datos.push(item);
    }
    GuardarLocal();
    alert("Viaje agregado al carrito de compras correctamente");
 } else{
    alert("ingresar cantidad valida");
 }
    } catch (error) {
        console.error("la función no corre bien",error);
    }   
    }else{
        botonComprar.onclick= () =>{
            alert("debe de tener una sesión para comprar");
            window.location.href = '../7-crear-cuenta/index.html';
        }
    }
}
function limpiar(){
localStorage.clear();
}
