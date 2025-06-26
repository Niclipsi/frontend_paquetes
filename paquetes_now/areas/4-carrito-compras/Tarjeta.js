
document.getElementById("subir").addEventListener("click", () => {
  const modal = document.getElementById("modalPago");
  modal.classList.add("activo");
  modal.classList.remove("oculto");
});

document.getElementById("cerrarModal").addEventListener("click", () => {
  const modal = document.getElementById("modalPago");
  modal.classList.remove("activo");
  modal.classList.add("oculto");
});

 const STRAPI_HOST = 'http://localhost:1338'
 const urlP = `${STRAPI_HOST}/api/paquetes-turismos?populate=*`;

const formulario = document.getElementById("formularioPago");

formulario.addEventListener("submit", async function (e) {
  e.preventDefault();

  const token = localStorage.getItem("token"); 
  const nombre_tarjeta = document.getElementById("nombre_tarjeta").value.trim();
  const num_tarjeta = document.getElementById("num_tarjeta").value.trim();
  const vencimiento = document.getElementById("vencimiento").value.trim();
  const CVV = document.getElementById("CVV").value.trim();

  if (!nombre_tarjeta || !num_tarjeta || !vencimiento || !CVV) {
    alert("Debe completar todos los campos para proceder con la compra.");
    return;
  }

  if (num_tarjeta.length !== 16 || isNaN(num_tarjeta)) {
    alert("El número de tarjeta debe tener 16 dígitos numéricos.");
    return;
  }

  if (CVV.length < 3 || isNaN(CVV)) {
    alert("El CVV debe tener al menos 3 dígitos numéricos.");
    return;
  }

  try {
    const res = await fetch("http://localhost:1338/api/tarjetas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          Nombre_tarjeta:nombre_tarjeta,
         num_tarjeta: num_tarjeta,
         vencimiento: vencimiento,
          CVV: CVV,
        },
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(" Tarjeta registrada correctamente");
      document.getElementById("modalPago").classList.remove("activo");
      document.getElementById("modalPago").classList.add("oculto");
      formulario.reset();
    } else {
      console.error(data);
      alert(" Error al registrar tarjeta: " + (data.error?.message || "desconocido"));
    }
  } catch (error) {
    console.error("Error al enviar datos:", error);
    alert(" Error en el servidor o conexión.");
  }
});