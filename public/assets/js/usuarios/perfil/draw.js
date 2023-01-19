const drawTable = () => {
	const nombre = document.getElementById("nombre");
	const nombreIG = document.getElementById("nombreIG");
	const email = document.getElementById("email");
	const tel = document.getElementById("telefono");
	const puesto = document.getElementById("puesto");
	const imagenProyecto = document.querySelector("#imagen-perfil");
	//const previsualizacion = document.querySelector("#preview_img");
	imagenProyecto.src = dataTable.usuario.imagen
	/* previsualizacion.src = infoProyect.proyecto.imagen
		? infoProyect.proyecto.imagen
		: "https://res.cloudinary.com/nodecafe/image/upload/v1661527854/Dashboard/wundertec-logo-2_hry1os.png"; */

	nombre.textContent = `${
		dataTable.usuario.nombre +
		" " +
		(dataTable.usuario.apellidoP ? dataTable.usuario.apellidoP : "") +
		" " +
		(dataTable.usuario.apellidoM ? dataTable.usuario.apellidoM : "")
	}`;

	nombreIG.innerHTML = `<strong class="text-dark">Nombre:</strong> &nbsp; ${
		dataTable.usuario.nombre +
		" " +
		(dataTable.usuario.apellidoP ? dataTable.usuario.apellidoP : "") +
		" " +
		(dataTable.usuario.apellidoM ? dataTable.usuario.apellidoM : "")
	}`;

	email.innerHTML = `<strong class="text-dark">Email:</strong> &nbsp; ${dataTable.usuario.email}`;

	tel.innerHTML = `<strong class="text-dark">Teléfono:</strong> &nbsp; ${
		dataTable.usuario.celular ? dataTable.usuario.celular : "5555555555"
	}`;

	puesto.innerHTML = getPuesto(dataTable.usuario);
};

const drawProjects = () => {
	const contProyectos = document.querySelector("#proyectos");
	let html = "";
	let progressFix = Math.floor(Math.random() * 101);
	let progressHour = progressFix * (Math.floor(Math.random() * 5) + 1) * 8;
	dataTable.proyectos.forEach(e => {
		html+=`<tr>
		<td>
			<div
				class="d-flex px-2 py-1">
				<div>
					<img
						src="${e.imagen}"
						class="avatar avatar-sm me-3"
						alt="xd" />
				</div>
				<div
					class="d-flex flex-column justify-content-center">
					<h6
						class="mb-0 text-sm">
						${e.nombre}
					</h6>
				</div>
			</div>
		</td>
		<td
			class="align-middle text-sm">
			<span class="text-xs font-weight-bold">App - Web</span>
		</td>
		<td
			class="align-middle text-center text-sm">
			<span
				class="text-xs font-weight-bold"
				>${progressHour}hrs
			</span>
		</td>
		<td class="align-middle">
			<div
				class="progress-wrapper w-75 mx-auto">
				<div
					class="progress-info">
					<div
						class="progress-percentage">
						<span
							class="text-xs font-weight-bold"
							>${progressFix}% Completado</span
						>
					</div>
				</div>
				<div class="progress">
					<div
						class="progress-bar bg-gradient-info"
						role="progressbar"
						aria-valuenow="${Math.ceil(progressFix)}"
						aria-valuemin="0"
						aria-valuemax="100"
						style="width: ${progressFix}%"></div>
				</div>
			</div>
		</td>
		</tr>`
	});

	contProyectos.innerHTML = html;

}
const getPuesto = (usuario) => {
	if (usuario.rol === "DEV") {
		return "Desarrollador";
	}
	if (usuario.rol === "QA") {
		return "Tester";
	}
	if (usuario.rol === "PM") {
		return "Project Manager";
	}
};
