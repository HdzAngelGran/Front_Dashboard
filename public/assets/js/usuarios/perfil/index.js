const getData = async() => {

    const data = await getRequest("usuarios/unico/", [["idu", localStorage.getItem("userId")]]);

    console.log(data);
    
    dataTable = data;
    drawTable();
    drawProjects();
}

const main = async() => {
    showLoader();
    
    drawNavBar([
        `${baseURL}`,
        `${baseURL}/pages/proyectos/`,
        `${baseURL}/pages/usuarios/`,
        `${baseURL}/pages/projectlist/`
    ]);
    
    await getData();
    hideLoader();
}

main();