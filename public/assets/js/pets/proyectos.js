const getProyectos = async() => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=1lrtodpcp1l8084baqou7rllt6; locale=en_US");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${baseApi}/proyectos/`, requestOptions);

        const status = response.status;
        const data = await response.json();

        if (statusPet(status, data))
            return data.contentM;
        else
            throw new Error(data);
    } catch (error) {
        console.log(error);

        mostrarNotificacion("Error", "Error al obtener los proyectos.", "error");
    }
}