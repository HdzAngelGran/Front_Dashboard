const tareasPage = (id, estado) => {
    localStorage.removeItem("projectId");
    localStorage.removeItem("estado");
    localStorage.setItem("projectId", id);
    localStorage.setItem("estado", estado);
    document.location = `${baseURL}/pages/proyectos/tareas/`;
}

const profilePage = (id) => {
    localStorage.removeItem("userId");
    localStorage.setItem("userId", id);
    document.location = `${baseURL}/pages/usuarios/perfil/`;
}