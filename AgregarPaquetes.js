export const STRAPI_HOST = 'http://localhost:1338';

window.addEventListener("DOMContentLoaded", function () {
    cargarPaquetes(); 

    const btnBuscar = document.getElementById("btnbuscar"); 
    console.log("Botón encontrado:", btnBuscar);

    btnBuscar.addEventListener("click", function (e) {
        e.preventDefault(); 
        console.log("Clic detectado");

        const destino = document.getElementById('filtro-destino').value.trim();
        console.log("Destino elegido:", destino);
        cargarPaquetes(destino); 
    });
});
    

export async function cargarPaquetes(destino = '') {
    const urlP = `${STRAPI_HOST}/api/paquetes-turismos?populate=*`;
    let url = urlP;
        console.log(url);

    if (destino) {
        url += `&filters[destino][$eq]=${encodeURIComponent(destino)}`;
        console.log(url);
    }

    const res = await fetch(url);
    const data = await res.json();
    const paquetes = data.data;

    const listaPaquetes = document.querySelector(".lista-paquetes");
    listaPaquetes.innerHTML = '';

    if (Array.isArray(paquetes)) {
        paquetes.forEach(paquete => {
           const id = paquete.id;
const titulo_h1 = document.getElementById("Titulo_h1");

// Crear contenedor principal
const tarjeta = document.createElement("div");
tarjeta.className = "tarjeta";

// Imagen
const imagen = document.createElement("img");
const imagenData = paquete.Imagen?.url;
imagen.src = imagenData ? STRAPI_HOST + imagenData : "/imagenes/imagenPrueba.png";
imagen.alt = paquete.NombreV ?? "Imagen del paquete";
tarjeta.appendChild(imagen);

// Contenido
const contenido = document.createElement("div");
contenido.className = "contenido";

// Etiqueta de oferta
const etiqueta = document.createElement("div");
etiqueta.className = "etiqueta-oferta";
etiqueta.textContent = "Oferta de la semana";
contenido.appendChild(etiqueta);

// Info superior (fecha y ícono)
const infoSuperior = document.createElement("div");
infoSuperior.className = "info-superior";

const fecha = document.createElement("span");
fecha.textContent = `${paquete.fechaDeSalida ?? 'Fecha no disponible'} - ${paquete.noches ?? '?'} noches`;

const icono = document.createElement("span");
icono.className = "icono-paquete";
icono.textContent = "📦 Paquete";

infoSuperior.appendChild(fecha);
infoSuperior.appendChild(icono);
contenido.appendChild(infoSuperior);

// Título del paquete
const h3 = document.createElement("h3");
h3.textContent = paquete.NombreV ?? "Nombre no disponible";
contenido.appendChild(h3);

// Descripción
const descripcion = document.createElement("p");
descripcion.innerHTML = `<strong>${paquete.descripcion ?? "Sin descripción"}</strong>`;
contenido.appendChild(descripcion);

// Precio
const divPrecio = document.createElement("div");
divPrecio.className = "precio";

const textoPrecio = document.createElement("p");
textoPrecio.textContent = "Precio por persona desde";

const valorPrecio = document.createElement("strong");
valorPrecio.textContent = `u$s ${paquete.precio ?? "N/D"}`;

const aclaracion = document.createElement("span");
aclaracion.textContent = "Incluye impuestos, tasas y cargos";

divPrecio.appendChild(textoPrecio);
divPrecio.appendChild(valorPrecio);
divPrecio.appendChild(aclaracion);
contenido.appendChild(divPrecio);

// Botón
const boton = document.createElement("button");
boton.textContent = "Ver paquete";
boton.className = "btn-ver-paquete";
boton.addEventListener("click", () => {
    localStorage.setItem("MostrarDatosID", id);
    window.location.href = "areas/3-datos-producto/index.html";
});
contenido.appendChild(boton);

// Unir todo
tarjeta.appendChild(contenido);
listaPaquetes.appendChild(tarjeta);

// Título general
if (destino === "") {
  titulo_h1.innerHTML = "TODOS LOS PAQUETES";
} else {
  titulo_h1.innerHTML = `Paquetes turísticos de ${destino}`;
}
        });
    } else {
        console.error("Los paquetes no fueron encontrados", data);
    }
}