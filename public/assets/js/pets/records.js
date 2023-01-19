const getRecord = async() => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=1lrtodpcp1l8084baqou7rllt6; locale=en_US");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Access-Control-Allow-Credentials", "true");
    myHeaders.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    myHeaders.append("Vary", "Origin");
    myHeaders.append("Host", baseURL);
    myHeaders.append("fechas", 9);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${baseApi}/records/varios/`, requestOptions);

        const status = response.status;
        const data = await response.json();

        if (statusPet(status, data))
            return data;
        else
            throw new Error(data);
    } catch (error) {
        console.log(error);

        mostrarNotificacion("Error", "Error al obtener los proyectos.", "error");
    }
}