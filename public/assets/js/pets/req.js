const getRequest = async(url = '', headers = []) => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=1lrtodpcp1l8084baqou7rllt6; locale=en_US");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Access-Control-Allow-Credentials", "true");
    myHeaders.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    myHeaders.append("Vary", "Origin");
    myHeaders.append("Host", baseURL);
    myHeaders.append("jwt", localStorage.getItem("token"));

    headers.forEach(head => {
        myHeaders.append(head[0], head[1]);
    });

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${baseApi}/${url}`, requestOptions);

        const status = response.status;
        const data = await response.json();

        if (statusPet(status, data)){
            return data;
        } else if(status == 401)
            window.location.replace(`${baseURL}/pages/login`);
        else
            throw new Error(data);
    } catch (error) {
        console.log(error);

        hideLoader();
        mostrarNotificacion("Error", "Error al obtener los recursos.", "error");
    }
}

const postSubirImagen = async(body) => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=1lrtodpcp1l8084baqou7rllt6; locale=en_US");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Access-Control-Allow-Credentials", "true");
    myHeaders.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    myHeaders.append("Vary", "Origin");
    myHeaders.append("Host", baseURL);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("jwt", localStorage.getItem("token"));

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: body,
        redirect: 'follow'
    };

    try {
        console.log(requestOptions, body.entries(),`${baseApi}/uploads/img/`);
        const response = await fetch(`${baseApi}/uploads/img/`, requestOptions);

        const status = response.status;
        const data = await response.json();

        if (statusPet(status, data)) {
            return data;
        } else if(status == 401)
            window.location.replace(`${baseURL}/pages/login`);
        else
            throw new Error(data);
    } catch (error) {
        console.log(error);

        hideLoader();
        mostrarNotificacion("Error", "Error al obtener los recursos.", "error");
    }
}

const postRequest = async(url = '', body = {}, headers = []) => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=1lrtodpcp1l8084baqou7rllt6; locale=en_US");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Access-Control-Allow-Credentials", "true");
    myHeaders.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    myHeaders.append("Vary", "Origin");
    myHeaders.append("Host", baseURL);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("jwt", localStorage.getItem("token"));

    headers.forEach(head => {
        myHeaders.append(head[0], head[1]);
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body),
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${baseApi}/${url}`, requestOptions);

        const status = response.status;
        const data = await response.json();

        if (statusPet(status, data)) {
            return data;
        } else if(status == 401)
            window.location.replace(`${baseURL}/pages/login`);
        else
            throw new Error(data);
    } catch (error) {
        console.log(error);

        hideLoader();
        mostrarNotificacion("Error", "Error al obtener los recursos.", "error");
    }
}

const putRequest = async(url = '', body = {}, headers = []) => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=1lrtodpcp1l8084baqou7rllt6; locale=en_US");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Access-Control-Allow-Credentials", "true");
    myHeaders.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    myHeaders.append("Vary", "Origin");
    myHeaders.append("Host", baseURL);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("jwt", localStorage.getItem("token"));

    headers.forEach(head => {
        myHeaders.append(head[0], head[1]);
    });

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(body),
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${baseApi}/${url}`, requestOptions);

        const status = response.status;
        const data = await response.json();

        if (statusPet(status, data)){
            return data;
        } else if(status == 401)
            window.location.replace(`${baseURL}/pages/login`);
        else
            throw new Error(data);
        
    } catch (error) {
        console.log(error);

        hideLoader();
        mostrarNotificacion("Error", "Error al obtener los recursos.", "error");
    }
}

const delRequest = async(url = '', headers = []) => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=1lrtodpcp1l8084baqou7rllt6; locale=en_US");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Access-Control-Allow-Credentials", "true");
    myHeaders.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    myHeaders.append("Vary", "Origin");
    myHeaders.append("Host", baseURL);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("jwt", localStorage.getItem("token"));

    headers.forEach(head => {
        myHeaders.append(head[0], head[1]);
    });

    const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${baseApi}/${url}`, requestOptions);

        const status = response.status;
        const data = await response.json();

        if (statusPet(status, data)){
            return data;
        } else if(status == 401)
            window.location.replace(`${baseURL}/pages/login`);
        else
            throw new Error(data);
        
    } catch (error) {
        console.log(error);

        hideLoader();
        mostrarNotificacion("Error", "Error al obtener los recursos.", "error");
    }
}