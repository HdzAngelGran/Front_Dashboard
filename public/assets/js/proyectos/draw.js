const drawTable = (tipoProyectos) => {
	const tbody = document.getElementById('draw')
	console.log('draw table', dataTable[tipoProyectos])

	tbody.innerHTML = ''

	dataTable[tipoProyectos].map((proyecto) => {
		const divC = document.createElement('div')
		divC.classList.add('col-lg-4')
		divC.classList.add('col-md-6')
		divC.style.display = 'flex'
		divC.style.flexWrap = 'wrap'
		divC.style.flexFlow = 'column'

		const div1 = document.createElement('div')
		div1.classList.add('mb-4')

		const td1 = `
            <div class="card">
                <div class="card-body p-3">
                    <div class="d-flex">
                        <div class="avatar avatar-xl bg-gradient-dark border-radius-md p-2 mano" onclick="tareasPage('${
													proyecto._id
												}', '${proyecto.estado}')">
                            <img class="logo-proyecto mano" src="${
															proyecto.imagen
														}" alt="slack_logo">
                        </div>
                        <div class="ms-3 my-auto">
                            <h6 class="mano" onclick="tareasPage('${proyecto._id}', '${
			proyecto.estado
		}')">${proyecto.nombre}</h6>
                            <div class="avatar-group">
                                ${drawPersonasProyecto(proyecto.usuarios)}
                            </div>
                        </div>
                        <div class="ms-auto">
                            <div class="dropdown">
                                <button class="btn btn-link text-secondary ps-0 pe-2" onclick="modalRecord('${
																	proyecto._id
																}_${proyecto.nombre}')">
                                    <i class="fa fa-ellipsis-v text-lg"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr class="horizontal dark">
                    <div class="row">
                        <div class="col-6">
                            <h6 class="text-sm mb-0">${proyecto.usuarios.length}</h6>
                            <p class="text-secondary text-sm font-weight-bold mb-0">Participantes</p>
                        </div>
                    </div>
                </div>
            </div>
        `

		div1.innerHTML = td1

		divC.appendChild(div1)

		tbody.appendChild(divC)

		tbody.style.height = '65vh'
		tbody.style.overflowY = 'scroll'
	})
}

const drawPersonasProyecto = (personas) => {
	let html = ''
	personas.forEach((p) => {
		let nombre =
			p.nombre + ' ' + (p.apellidoP ? p.apellidoP : '') + ' ' + (p.apellidoM ? p.apellidoM : '')
		html += `<a href="javascript:;" class="avatar avatar-s rounded-circle" data-bs-toggle="tooltip" data-bs-placement="top" title="${nombre}">
            <img alt="${nombre}" src="${p.imagen}" class="">
        </a>`
	})

	return html
}

const drawProgress = (record) => {
	console.log(record)
	const total = record.desarrollo + record.qa + record.listo
	console.log(total)

	document.getElementById('recordProyecto').innerHTML = `
        <li class="list-group-item border-0 d-flex align-items-center px-0 mb-0">
            <div class="w-100">
                <div class="d-flex mb-2">
                    <span class="me-2 text-sm font-weight-bold text-capitalize">
                        En desarrollo
                    </span>
                    <span class="ms-auto text-sm font-weight-bold">${
											total !== 0 ? ((record.desarrollo * 100) / total).toFixed(2) : 0
										}%</span>
                </div>
                <div>
                    <div class="progress progress-md">
                        <div class="progress-bar bg-gradient-info w-${
													total !== 0 ? ((record.desarrollo * 10) / total).toFixed(0) * 10 : 0
												}" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
                        </div>
                    </div>
                </div>
            </div>
        </li>
        <li class="list-group-item border-0 d-flex align-items-center px-0 mb-2">
            <div class="w-100">
                <div class="d-flex mb-2">
                    <span class="me-2 text-sm font-weight-bold text-capitalize">
                        QA
                        </span>
                    <span class="ms-auto text-sm font-weight-bold">${
											total !== 0 ? ((record.qa * 100) / total).toFixed(2) : 0
										}%</span>
                </div>
                <div>
                    <div class="progress progress-md">
                        <div class="progress-bar bg-gradient-dark2 w-${
													total !== 0 ? ((record.qa * 10) / total).toFixed(0) * 10 : 0
												}" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
                        </div>
                    </div>
                </div>
            </div>
        </li>
        <li class="list-group-item border-0 d-flex align-items-center px-0 mb-2">
            <div class="w-100">
                <div class="d-flex mb-2">
                    <span class="me-2 text-sm font-weight-bold text-capitalize">
                        Hecho
                    </span>
                    <span class="ms-auto text-sm font-weight-bold">${
											total !== 0 ? ((record.listo * 100) / total).toFixed(2) : 0
										}%</span>
                </div>
                <div>
                    <div class="progress progress-md">
                        <div class="progress-bar bg-gradient-danger w-${
													total !== 0 ? ((record.listo * 10) / total).toFixed(0) * 10 : 0
												}" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">
                        </div>
                    </div>
                </div>
            </div>
        </li>`
}
