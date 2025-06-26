document.getElementById("subir").addEventListener("click", async function (e) {
    e.preventDefault();
    const subiar = document.getElementById("subir"); 
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("usuario-nombre").value.trim();
    const constra = document.getElementById("usuario-contrasena").value;
    const confirmarContra = document.getElementById("usuario-contrasena-conf").value;
    if(!email|| !username||!constra||!confirmarContra){
        console.log("ingresar todos los campos");
        return;
    }
    if (constra !== confirmarContra) {
        alert("Las contraseñas no coinciden.");
        return;
    }
    try {        
    const res = await fetch("http://localhost:1338/api/auth/local/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: constra
        })
    });    
    const data = await res.json();   
    console.log("respuesta de strapi:", data);

    if (!res.ok) {
        if(data.error && data.error.message.includes("already taken")){
            alert("El usuario o correo ya estan registrados")
        }else{
            console.error("error desconocido",data);
            alert("error al registrar. intentar denuevo más tarde");
        }
        
    } else {
        alert("Usuario registrado correctamente");
        console.log("usuario registrado:",data);   
        window.location.href = '../8-iniciar-secion/index.html' 
    }
        
    } catch (error) {
        console.error("error de conexión con strapi",error);
        alert("error al conectarse con el servidor");     
    }
});