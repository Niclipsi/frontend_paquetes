document.getElementById("subir").addEventListener("click", async function (e) {
    e.preventDefault();

    const nombre = document.getElementById("usario-nombre-iniciar").value.trim();
    const contra = document.getElementById("usario-contra-iniciar").value;

    if (!nombre || !contra) {
        alert("Por favor, complete los campos.");
        return;
    }

    try {
        const res = await fetch("http://localhost:1338/api/auth/local", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                identifier: nombre,
                password: contra
            })
        });

        const data = await res.json();
        console.log("Respuesta de login:", data);

        if (!res.ok) {
            if (data.error && data.error.message) {
                alert("Error: " + data.error.message);
            } else {
                alert("Error desconocido al iniciar sesión");
            }
            return;
        }
        localStorage.setItem("token", data.jwt);
        localStorage.setItem("usario", JSON.stringify(data.user));
        alert("Inicio de sesión exitoso");
        window.location.href = "../../index.html";

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("No se pudo conectar al servidor");
    }
});