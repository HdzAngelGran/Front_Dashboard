const unitePet = async(data) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "nombre": data.name,
        "idP": data.id,
        "imagen": "https://res.cloudinary.com/nodecafe/image/upload/v1661290561/Dashboard/velez_pz7ltw.png"
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const response = await fetch("http://localhost:8080/api/proyectos/crear/unico/", requestOptions);
    const res = await response.json();
    console.log(res);
}

const massivePets = async() => {
    dataTable.forEach(async(data) => {
        await unitePet(data);
    });
}