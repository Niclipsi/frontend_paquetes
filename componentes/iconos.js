window.addEventListener("DOMContentLoaded", () => {
  const iconos = document.querySelectorAll(".filtrar figure");

  iconos.forEach(element => {
    element.addEventListener("click", () => {
      // 🔁 Dentro del click, eliminar "activo" de todos
      iconos.forEach(i => i.querySelector("figcaption").classList.remove("activo"));

      // ✅ Agregar al clickeado
      element.querySelector("figcaption").classList.add("activo");
    });
  });
});
