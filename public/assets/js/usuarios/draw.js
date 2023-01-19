const drawTable = (counter) => {
    if (counter < 0)
        throw new Error("La tabla comienza en 1")
    if (dataTable.length <= counter)
        throw new Error(`El límite de proyectos es ${dataTable.length}`);

    const tbody = document.getElementById('draw');

    tbody.innerHTML = '';

    for (let i = counter; i < dataTable.length; i++) {
        const tr = document.createElement('tr');

        const td1 = `
            <td>
                <div class="d-flex px-2 py-1">
                    <div class="mano" onclick="profilePage(${dataTable[i].idU})">
                        <img src="${dataTable[i].imagen}" class="avatar avatar-sm me-3" alt="user2">
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">${dataTable[i].nombre + " " + (dataTable[i].apellidoP ? dataTable[i].apellidoP : "") + " " + (dataTable[i].apellidoM ? dataTable[i].apellidoM : "")}</h6>
                        <p class="text-xs text-secondary mb-0">${dataTable[i].email}</p>
                    </div>
                </div>
            </td>
            <td>
                <p class="text-xs font-weight-bold mb-0">${getPuesto(dataTable[i])}</p>
            </td>
            <td class="align-middle text-center text-sm">
                <span class="badge badge-sm bg-gradient-success">Oficina</span>
            </td>
            <td class="align-middle text-center">
                <div class="avatar-group">
                    ${drawProyectosPersona(dataTable[i].proyectos)}
                </div>
            </td>
            <td class="align-middle">
                <a class="link-perfil text-secondary font-weight-bold text-xs mano" onclick="profilePage(${dataTable[i].idU})">
                    <img src="../../assets/img/icono-perfil.png" alt="">
                </a>
            </td>
        `;

        tr.innerHTML = td1

        tbody.appendChild(tr);
    }
}

const drawProyectosPersona = (proyectos) => {
    let html = ""
    proyectos.forEach(p => {
        html += `<div class="avatar avatar-s rounded-circle" data-bs-toggle="tooltip" data-bs-placement="top" title="${p.nombre}">
            <img alt="${p.nombre}" src="${p.imagen}">
        </div>`
    })

    return html;
}

const getPuesto = (usuario) => {
	if (usuario.rol.nombre === "DEV") {
		return "Desarrollador";
	}
	if (usuario.rol.nombre === "QA") {
		return "Tester";
	}
	if (usuario.rol.nombre === "PM") {
		return "Project Manager";
	}
    if(usuario.rol.nombre === "DIR"){
        return "Directivo";
    }
};