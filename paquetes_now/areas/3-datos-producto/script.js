
const botones = document.querySelectorAll(".info-botones button");


botones.forEach((boton) => {
    boton.addEventListener("click", () => {
        botones.forEach(b => b.classList.remove("activo"));
        boton.classList.add("activo");
    });
});
