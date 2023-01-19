const main = async() => {
    showLoader();
    
    drawNavBar([
        `${baseURL}`,
        `${baseURL}/pages/proyectos/`,
        `${baseURL}/pages/usuarios/`,
        "#"
    ]);
    
    hideLoader();
}

main();