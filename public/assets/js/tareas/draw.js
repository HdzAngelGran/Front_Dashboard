const meses = [
	"Ene",
	"Feb",
	"Mar",
	"Abr",
	"May",
	"Jun",
	"Jul",
	"Ago",
	"Sep",
	"Oct",
	"Nov",
	"Dic",
];

const drawMessage = async () => {
	const principal = document.getElementById("principal");

	const comentarios = await getRequest("comentarios/", [
		["id", dataTable[0]._id],
	]);

	principal.innerHTML = `
        <input type="hidden" id="id-mensaje-estatus" value="${
			dataTable[0]._id
		}"/>
        <h6>Estatus semanal</h6>
        
        <p class="text-sm">
            ${dataTable[0].mensaje}
        </p>
        <button id="comentarios" class="btn btn-link m-0 p-0" data-bs-toggle="modal" data-bs-target="#comentarios-estatus"><i class="fa fa-comments" aria-hidden="true"></i>&emsp;Comentarios ${
			comentarios.comentarios.length > 0
				? "(" + comentarios.comentarios.length + ")"
				: ""
		}</button>
        <span class="badge bg-gradient-info ms-auto float-end">${
			dataTable[0].fecha
		}</span>
    `;

	document
		.querySelector("#comentarios")
		.addEventListener("click", async () => {
			showLoader();

			const divComentariosAnteriores = document.getElementById(
				"comentarios-anteriores"
			);

			divComentariosAnteriores.innerHTML = "";

			try {
				let comentariosReverse = comentarios.comentarios.reverse();
				comentariosReverse.forEach((com) => {
					divComentariosAnteriores.innerHTML += drawComment(com);
				});
			} catch (error) {
				console.error(error);
			}

			hideLoader();
		});
};

const drawComment = (comentario) => {
	let html = `<div class="comentario mb-3 border-bottom">
        <div class="d-flex justify-content-between">
            <h6>
                ${comentario.usuario}
            </h6>
            <h6>${comentario.fecha}</h6>
        </div>
        <p>
            ${comentario.comentario}
        </p>
    </div>`;

	return html;
};

const drawGraphRecord = (record) => {
	//crearGraficaPastel("chart-record", "Estadistica del proyecto", ["Realizado", "Por realizar"], [record.record[0].record, 100 - record.record[0].record]);
	const canvaGrafica = document
		.getElementById("chart-record")
		.getContext("2d");
	const cantidadHacer = document.getElementById("cantidad-hacer");
	const cantidadTrabajando = document.getElementById("cantidad-trabajando");
	const cantidadHecho = document.getElementById("cantidad-hecho");
	const numTareas = document.getElementById("num-tareas");

	cantidadHacer.innerHTML = record.desarrollo;
	cantidadTrabajando.innerHTML = record.qa;
	cantidadHecho.innerHTML = record.listo;
	numTareas.innerHTML = record.desarrollo + record.qa;

	new Chart(canvaGrafica, {
		type: "doughnut",
		data: {
			labels: ["Realizado", "Por realizar"],
			datasets: [
				{
					label: "Estadistica del proyecto",
					weight: 9,
					cutout: 50,
					tension: 0.9,
					pointRadius: 2,
					borderWidth: 2,
					backgroundColor: ["#98ec2d", "#B9C0B8"],
					data: [record.record, 100 - record.record],
					fill: false,
				},
			],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					display: false,
				},
			},
			interaction: {
				intersect: false,
				mode: "index",
			},
			scales: {
				y: {
					grid: {
						drawBorder: false,
						display: false,
						drawOnChartArea: false,
						drawTicks: false,
					},
					ticks: {
						display: false,
					},
				},
				x: {
					grid: {
						drawBorder: false,
						display: false,
						drawOnChartArea: false,
						drawTicks: false,
					},
					ticks: {
						display: false,
					},
				},
			},
		},
	});
};

const drawGraphJira = (record) => {
	//crearGraficaPastel("chart-record", "Estadistica del proyecto", ["Realizado", "Por realizar"], [record.record[0].record, 100 - record.record[0].record]);
	const ctx1 = document.getElementById("chart-line").getContext("2d");

	const gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);

	gradientStroke1.addColorStop(1, "rgba(152,236,45,0.1)");
	gradientStroke1.addColorStop(0.2, "rgba(152,236,45,0.0)");
	gradientStroke1.addColorStop(0, "rgba(152,236,45,0)"); //purple colors

	const labels = record.map((record) => {
		const mes = record.fecha.split("/");
		return meses[parseInt(mes[0]) - 1];
	});
	const desarrollo = record.map((record) =>
		record.desarrollo ? record.desarrollo : 0
	);
	const qa = record.map((record) => (record.qa ? record.qa : 0));
	const listo = record.map((record) => (record.listo ? record.listo : 0));
	const label = ["Desarrollo", "QA", "Listo"];
	const data = [desarrollo, qa, listo];
	const color = ["#2152ff", "#ff4c4c", "#98ec2d"];

	new Chart(ctx1, {
		type: "line",
		data: {
			labels: labels,
			datasets: label.map((label, index) => {
				return {
					label: label,
					tension: 0.3,
					pointRadius: 2,
					pointBackgroundColor: color[index],
					borderColor: color[index],
					borderWidth: 2,
					backgroundColor: gradientStroke1,
					data: data[index],
					maxBarThickness: 6,
					fill: true,
				};
			}),
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					display: false,
				},
			},
			interaction: {
				intersect: false,
				mode: "index",
			},
			scales: {
				y: {
					grid: {
						drawBorder: false,
						display: false,
						drawOnChartArea: false,
						drawTicks: false,
					},
					ticks: {
						display: false,
					},
				},
				x: {
					grid: {
						drawBorder: false,
						display: false,
						drawOnChartArea: false,
						drawTicks: false,
					},
					ticks: {
						color: "#252f40",
						padding: 10,
					},
				},
				y: {
					grid: {
						drawBorder: false,
						display: false,
						drawOnChartArea: true,
						drawTicks: false,
						borderDash: [5, 5],
					},
					ticks: {
						display: true,
						padding: 10,
						color: "#9ca2b7",
					},
				},
				x: {
					grid: {
						drawBorder: false,
						display: true,
						drawOnChartArea: true,
						drawTicks: false,
						borderDash: [5, 5],
					},
					ticks: {
						display: true,
						padding: 10,
						color: "#9ca2b7",
					},
				},
			},
		},
	});
};

const drawStatus = () => {
	const statusContainer = document.getElementById("status-container");
	let estatusGenerales = "";

	dataTable.map((mensaje, index) => {
		if (index !== 0)
			estatusGenerales += `<div class="col-lg-4 col-12 mt-4 mt-lg-0">
                <div class="card">
                    <div class="card-header p-3 pb-0">
                        <div class="row">
                            <div class="col-8 d-flex">
                                <div>
                                    <img src="../../../assets/img/team-3.jpg" class="avatar avatar-sm me-2"
                                         alt="avatar image">
                                </div>
                                <div class="d-flex flex-column justify-content-center">
                                    <h6 class="mb-0 text-sm">Luis Herrera</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-3">
                        <h6>Estatus anterior</h6>
            
                        <p class="text-sm">
                            ${mensaje.mensaje}
                        </p>
                        <span class="badge bg-gradient-info ms-auto float-end">${mensaje.fecha}</span>
                    </div>
                </div>
            </div>`;
	});

	statusContainer.innerHTML = estatusGenerales;
};

const drawJiraTypes = () => {
	const statusContainer = document.getElementById("body-listado");
	let estatusGenerales = "";

	if (dataTareas.length === 0)
		estatusGenerales = "No hay tareas en el tablero para mostrar";

	dataTareas.map((tarea, index) => {
		estatusGenerales += `<div class="col-lg-4 col-12 mb-4">
                <div class="card">
                    <div class="card-header p-3 pb-0">
                        <div class="row">
                            <div class="col-8 d-flex">
                                <div class="me-1">
                                    ${tarea.key}
                                </div>
                                <div class="d-flex flex-column justify-content-center">
                                    <h6 class="mb-0 text-sm">${tarea.asignada}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-3">
                        <p class="text-sm">
                            ${tarea.descripcion}
                        </p>
                        <span class="badge bg-gradient-info ms-auto float-end mano" onclick=verComentariosTarea(${index})>Comentarios: ${tarea.comentarios.length}</span>
                    </div>
                </div>
            </div>`;
	});

	statusContainer.innerHTML = estatusGenerales;
};

const drawJiraTypeComment = (comentarios) => {
	const statusContainer = document.getElementById("body-comentarios-listado");
	let estatusGenerales = "";

	if (comentarios.length === 0)
		estatusGenerales = "No hay comentarios para esta tarea";

	comentarios.map((comentario) => {
		const fecha = new Date(comentario.creado);

		estatusGenerales += `<div class="comentario mb-3 border-bottom">
                <div class="d-flex justify-content-between">
                    <h6>
                        ${comentario.autor}
                    </h6>
                    <h6>${fecha.getDay()}/${
			fecha.getMonth() + 1
		}/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}</h6>
                </div>
                <p>
                    ${comentario.contenido}
                </p>
            </div>`;
	});

	statusContainer.innerHTML = estatusGenerales;
};

const drawPersonProyect = (lista, persona) => {
	console.log("Info persona: ", persona)
	const html = `<li
        class="list-group-item border-0 d-flex align-items-center p-2 mb-2 table-hover">
        <select title="Seleccione un rol" class="w-20 me-auto form-select" onchange="cambiarRol(this, '${persona.idUP}', '${persona.rol}')">
        	<option value="0" ${(!persona.rol) ? 'selected' :''}>Sin</option>
        	<option value="Dev" ${(persona.rol == "Dev") ? 'selected' :''}>Dev</option>
        	<option value="Lider" ${(persona.rol == "Lider") ? 'selected' :''}>Líder</option>
        	<option value="Qa" ${(persona.rol == "Qa") ? 'selected' :''}>QA</option>
		</select>
        <h6 class="mb-0 text-sm text-wrap">
            ${persona.nombre}
        </h6>
        <button
            class="btn btn-link mb-0 me-0 ms-auto p-0 text-lg" onclick="eliminarPersonaProyecto(this, '${persona.idUP}')">
            <i
                class="fa fa-trash-o"
                aria-hidden="true"></i>
        </button>
    </li>`;
	lista.insertAdjacentHTML("beforeend", html);
};
