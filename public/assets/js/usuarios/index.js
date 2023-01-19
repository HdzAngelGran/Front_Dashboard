const getData = async() => {

    const data = await getRequest(`usuarios/`);

    console.log(data.contentM);

    dataTable = data.contentM;

    drawTable(0);
}

const main = async() => {
    showLoader();

    drawNavBar([
        `${baseURL}/`,
        `${baseURL}/pages/proyectos/`,
        '#',
        `${baseURL}/pages/projectlist/`
    ]);

    await getData();
    
    hideLoader();
}

main();