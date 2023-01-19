const getEquipo = async() => {
    const equipoNum = document.getElementById("num-equipo");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${baseApi}/usuarios/`, requestOptions);

        const status = response.status;
        const data = await response.json();

        if (statusPet(status, data)) {
            equipoNum.textContent = data.contentM.length;
        } else{
            throw new Error(data);
        }
    } catch (error) {
        console.log(error);
        mostrarNotificacion("Error", "Error al obtener los proyectos.", "error");
    }
}