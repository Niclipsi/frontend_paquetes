export const STRAPI_HOST = 'http://localhost:1338';

window.addEventListener("DOMContentLoaded", function () {
    cargarPaquetes();
});

document.getElementById('filtro-destino').addEventListener('change', function () {
    const destino = this.value.trim();
    cargarPaquetes(destino);
});

export async function cargarPaquetes(destino = '') {
    const urlP = `${STRAPI_HOST}/api/paquetes-turismos?populate=*`;
    let url = urlP;

    if (destino) {
        url += `&filters[destino][$eq]=${encodeURIComponent(destino)}`;
        
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

            const tituloP = document.getElementById("titulo_paquete");
            const tarjeta = document.createElement("section");
            tarjeta.className = 'paquete';

            const figura = document.createElement("figcaption");
            figura.className = 'paquete-foto-muestra';
            const imagen = document.createElement("img");
            imagen.className = 'img';
            imagen.src = "/imagenes/imagenPrueba.png";
            imagen.alt = "Imagen del paquete";
            figura.appendChild(imagen);

            const ulInfo = document.createElement("ul");
            ulInfo.className = 'paquete-lista-info';

            const datos1 = {
                nombre: paquete.NombreV ?? "Nombre no disponible",
                destino: paquete.destino ?? "Destino no disponible",
                fecha: paquete.fechaDeSalida ?? "Fecha no disponible",
                noches: paquete.noches ?? "Noches no disponibles",
                saliendo: paquete.saliendoDesde ?? "Origen no disponible"
            };

            const clases1 = {
                nombre: 'h2',
                destino: 'li',
                salida: 'li',
                noches: 'li',
                retiro: 'li'
            };

            for (const key in datos1) {
                if (clases1[key] === 'h2') {
                    const h2 = document.createElement("h2");
                    h2.textContent = datos1[key];
                    ulInfo.appendChild(h2);
                } else {
                    const li = document.createElement("li");
                    li.innerHTML = `${key.charAt(0).toUpperCase() + key.slice(1)}: <span>${datos1[key]}</span>`;
                    ulInfo.appendChild(li);
                }
            }

            const divCompra = document.createElement("div");
            divCompra.className = "paquete-compra";

            const datos2 = {
                precioTexto: "Precio:",
                precio: `$${paquete.precio ?? "No disponible"}`,
                personas: `Personas: ${paquete.cantidad ?? 1}`
            };

            for (const key in datos2) {
                const p = document.createElement("p");
                p.textContent = datos2[key];
                if (key === 'precio') p.className = "azul fuente-grande";
                if (key === 'personas') {
                    const span = document.createElement("span");
                    span.textContent = datos2[key].split(": ")[1];
                    span.className = "azul";
                    p.innerHTML = "Personas: ";
                    p.appendChild(span);
                }
                divCompra.appendChild(p);
            }

            const a = document.createElement("a");
            a.href = "../3-datos-producto/index.html";
            const btn = document.createElement("button");
            btn.className = "btn-ver";
            btn.textContent = "Ver";
            btn.onclick = () => {
                localStorage.setItem("MostrarDatosID", id);
                window.location.href = "../3-datos-producto/index.html";
            };
            a.appendChild(btn);
            divCompra.appendChild(a);

            tarjeta.appendChild(figura);
            tarjeta.appendChild(ulInfo);
            tarjeta.appendChild(divCompra);

            listaPaquetes.appendChild(tarjeta);
            
            if (destino===""){
              titulo_h1.innerHTML = "TODOS LOS PAQUETES";
            }else{
              titulo_h1.innerHTML = `paquetes turisticos de ${destino}`;
            }
        });
    } else {
        console.error("Los paquetes no fueron encontrados", data);
    }
}