function crearPaquete(item,index) {
  // ELEMENTOS
  let precioTpaquete = localStorage.getItem("precioTpaquete");
  const article = document.createElement("article");
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const divContenido = document.createElement("div");
  const divLinea = document.createElement("div");
  const h2 = document.createElement("h2");
  const botonCerrar = document.createElement("button");
  botonCerrar.addEventListener("click",()=> {
    article.remove
    datos.splice(index,1);    
    actualizarS();
  })
  const imgCerrar = document.createElement("img");
  const detalles = document.createElement("div");

  const divPrecio = document.createElement("div");
  const pPrecioLabel = document.createElement("p");
  const pPrecioValor = document.createElement("p");
  const spanPrecio = document.createElement("span");

  const divPersonas = document.createElement("div");
  const pPersonasLabel = document.createElement("p");
  const pPersonasValor = document.createElement("p");
  const spanCantidad = document.createElement("span");

  const divFinal = document.createElement("div");
  const pFinalLabel = document.createElement("p");
  const pFinalValor = document.createElement("p");
  const spanFinal = document.createElement("span");

  const botonVer = document.createElement("button");
  botonVer.onclick = () =>{
    window.location.href = '../3-datos-producto/index.html';};
  // CLASES
  const clases = {
    article: "paquete",
    img: "img",
    divLinea: "linea",
    h2: "nombre",
    botonCerrar: "x btn-anima",
    imgCerrar: "img",
    detalles: "paquete-detalles",
    spanPrecio: "azul precioP fuente-grande",
    spanCantidad: "cantidad",
    pPersonasValor: "personas-rect",
    spanFinal: "azul precioF",
    botonVer: "btn-ver btn-anima",
    pFinalValor: "azul fuente-grande",
  };

  for (const key in clases) {
    const el = eval(key);
    if (el) el.className = clases[key];
  }

  // ATRIBUTOS
  h2.id = "nombre";
  spanPrecio.id = "precioP";
  spanCantidad.id = "cantidad";
  spanFinal.id = "precioF";

  img.src = "/imagenes/imagenPrueba.png";
  img.alt = "Imagen de ejemplo";

  imgCerrar.src = "/imagenes/icon/x-icon.png";
  imgCerrar.alt = "X";

  // TEXTOS
  pPrecioLabel.textContent = "Precio";
  spanPrecio.textContent = item.precio;

  pPersonasLabel.textContent = "Personas";
  spanCantidad.textContent = item.cantidad;

  pFinalLabel.textContent = "Precio final";
  spanFinal.textContent = precioTpaquete;

  h2.textContent = item.nombre;
  botonVer.textContent = "Ver";

  // ESTRUCTURA
  pPrecioValor.appendChild(spanPrecio);
  divPrecio.append(pPrecioLabel, pPrecioValor);

  pPersonasValor.appendChild(spanCantidad);
  divPersonas.append(pPersonasLabel, pPersonasValor);

  pFinalValor.appendChild(spanFinal);
  divFinal.append(pFinalLabel, pFinalValor);

  divLinea.append(h2, botonCerrar);
  botonCerrar.appendChild(imgCerrar);

  detalles.append(divPrecio, divPersonas, divFinal, botonVer);

  divContenido.append(divLinea, detalles);
  figure.appendChild(img);
  article.append(figure, divContenido);
  
  return article;}
    const section = document.getElementById("carrito");
    datos = JSON.parse(localStorage.getItem("carrito"));

function actualizarS() {
  localStorage.setItem("carrito", JSON.stringify(datos));
}
function MostrarDOM(){    
    section.innerHTML =""; 
    datos.forEach((item,index) => { 
       const tarjeta = crearPaquete(item,index);
       section.appendChild(tarjeta)
    });
    console.log("funcionando");
    actualizarS();
    precioFinal();
}
function precioFinal (){    
    const total = document.getElementById("total");
    const totalF = datos.reduce((acc,item) => acc + Number(item.cantidadT), 0);
    total.textContent = totalF;   
}
MostrarDOM();