document.querySelector('#btn-perfil').addEventListener('click', async() => {
    localStorage.setItem("userId", localStorage.getItem("user"));
    window.location.href = `${baseURL}/pages/usuarios/perfil`;
});

document.querySelector('#btn-logout').addEventListener('click', async() => {
    localStorage.clear();
    window.location.href = `${baseURL}/pages/login`;
});