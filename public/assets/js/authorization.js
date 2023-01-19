document.addEventListener('readystatechange', () => {
    const imagenUsuario = document.getElementById("imagen-usuario");
    const nombreUsuario = document.getElementById("nombre-usuario");

    if(document.readyState === "loading"){
        const token = localStorage.getItem("token");
        const page = window.location.href;

        if(!token && !page.includes("projectlist")){
            window.location.replace(`${baseURL}/pages/login/`);
        }   
    }
    if(document.readyState === "complete"){
        imagenUsuario.src = localStorage.getItem("imagen");
        nombreUsuario.innerHTML = localStorage.getItem("nombre");
        if(!localStorage.getItem("token")){
            document.querySelectorAll(".lgd").forEach((element) => {
                element.remove();
            });
        }
    }
    console.log(document.readyState)
});