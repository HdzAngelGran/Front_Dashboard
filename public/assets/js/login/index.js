const validarUsuario = async() => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const error = document.getElementById("msg-error");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "email": email,
        "password": password
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const response = await fetch(`${baseApi}/auth/login/`, requestOptions);
    const respStatus = response.status
    const resp = await response.json();

    if(statusPet(respStatus)){
        error.classList.add("d-none");
        localStorage.setItem('token', resp.token);
        localStorage.setItem('user', resp.user);

        if(resp.sesion){
            localStorage.setItem('nombre', resp.nombre);
            localStorage.setItem('imagen', resp.imagen);
            window.location.replace(baseURL);
        }else{
            localStorage.setItem('nombre', resp.nombre);
            localStorage.setItem('imagen', resp.imagen);
            localStorage.setItem('email', resp.email);

            window.location.href = `${baseURL}/pages/login/primerLogin`;
        }
    }
    else{
        error.classList.remove("d-none");
        error.innerHTML = resp.msg;
    }
}

document.querySelector("form").addEventListener("submit", function(event){
    event.preventDefault()
});