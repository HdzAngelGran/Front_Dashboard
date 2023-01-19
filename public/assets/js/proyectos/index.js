const myModal = new bootstrap.Modal(document.getElementById('modal-estatus'), {
    keyboard: false
});
const modalStatus = document.getElementById('modal-estatus');

const main = async() => {
    showLoader();

    drawNavBar([
        `${baseURL}/`,
        '#',
        `${baseURL}/pages/usuarios/`,
        `${baseURL}/pages/projectlist/`,
    ]);

    const resp = await getRequest('proyectos/');
    dataTable = resp.contentM;

    dataTable = {
        todos: resp.contentM,
        activos: resp.contentM.filter(proyecto => proyecto.estado == true),
        inactivos: resp.contentM.filter(proyecto => proyecto.estado == false)
    }
    
    drawTable('todos');

    hideLoader();
}

const modalRecord = async(nombre) => {
    showLoader();

    const info = nombre.split('_');

    const nombreProyecto = document.getElementById('titulo-proyecto');
    nombreProyecto.textContent = info[1];

    const record = await getRequest('proyRecords/', [['id', info[0]], ['fecha', `${new Date().getMonth() + 1}/${new Date().getFullYear()}`]]);

    drawProgress(record.record[record.record.length - 1]);
    myModal.show(modalStatus);

    hideLoader();
}

document.querySelectorAll('input[name="btn-proyectos"]').forEach(item => {
    item.addEventListener('change', async() => {

        let tipoProyectos = "";
        if(item.id === "btn-todos"){
            tipoProyectos = "todos";
        }else if(item.id === "btn-activos"){
            tipoProyectos = "activos";
        }else {
            tipoProyectos = "inactivos";
        }

        drawTable(tipoProyectos);
    })
});

main();