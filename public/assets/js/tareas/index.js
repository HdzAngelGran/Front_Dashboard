const myModal = new bootstrap.Modal(document.getElementById("listado-tareas"), {
	keyboard: false,
});
const myModal2 = new bootstrap.Modal(
	document.getElementById("comentarios-tareas"),
	{
		keyboard: false,
	}
);

const objetoModalComentario = new bootstrap.Modal(
	document.getElementById("comentarios-estatus"),
	{
		keyboard: false,
	}
);

const objetoModalImagen = new bootstrap.Modal(
	document.getElementById("cambiar-imagen-proyecto"),
	{
		keyboard: false,
	}
);

const modalTareas = document.getElementById("listado-tareas");
const modalComentariosTareas = document.getElementById("comentarios-tareas");
const modalTareasTitulo = document.getElementById("carril-tareas");
const modalComentariosTareasTitulo = document.getElementById(
	"comentarios-tareas-titulo"
);
const modalComentarios = document.getElementById("comentarios-estatus");

const main = async () => {
	showLoader();

	drawNavBar([
		`${baseURL}/`,
		`${baseURL}/pages/proyectos`,
		`${baseURL}/pages/usuarios/`,
		`${baseURL}/pages/projectlist/`,
	]);

	const resp = await getRequest("mensajes/", [
		["id", localStorage.getItem("projectId")],
	]);

	dataTable = resp.mensajes;

	if (dataTable.length !== 0) {
		drawMessage();
	} else {
		console.log("Sin mensajes");
	}

	drawStatus();

	const record = await getRequest("proyRecords/", [
		["id", localStorage.getItem("projectId")],
		["fecha", `${new Date().getMonth() + 1}/${new Date().getFullYear()}`],
	]);

	const infoProyect = await getRequest("proyectos/unico/", [
		["id", localStorage.getItem("projectId")],
	]);

	const usuariosTotales = await getRequest("usuarios/");

	const usuariosProyecto = await getRequest("usuarioProys/proyecto/", [
		["id", localStorage.getItem("projectId")],
	]);

	let arrayUsuariosProyecto = usuariosProyecto.usuarios;

	console.log(arrayUsuariosProyecto, usuariosTotales.contentM);

	const idP = localStorage.getItem("projectId");

	const listaUsuariosProyecto = document.getElementById("personas-actuales");

	arrayUsuariosProyecto.forEach((data) => {
		let body = {
			idP: idP
		};

		body.nombre =
			data.nombre +
			" " +
			(data.apellidoP ? data.apellidoP : "") +
			" " +
			(data.apellidoM ? data.apellidoM : "");
		body.idUP = data.idUP;
		body.rol = data.rolUP ? data.rolUP : "";

		console.log(body);

		drawPersonProyect(listaUsuariosProyecto, body);
	});

	let arrayNombres = usuariosTotales.contentM
		.filter((data) => {
			return !arrayUsuariosProyecto.some((dataUP) => {
				return data._id === dataUP._id;
			});
		})
		.map(
			(data) =>
				`<option value="${data._id}">${
					data.nombre +
					" " +
					(data.apellidoP ? data.apellidoP : "") +
					" " +
					(data.apellidoM ? data.apellidoM : "")
				}</option>`
		)
		.join("");

	const selectNombres = document.getElementById("personas");

	selectNombres.innerHTML = arrayNombres;

	$("#personas").selectpicker("refresh");

	const tituloProyecto = document.querySelector("#titulo-proyecto");
	tituloProyecto.innerHTML = infoProyect.proyecto.nombre;

	const imagenProyecto = document.querySelector("#imagen-proyecto");
	const previsualizacion = document.querySelector("#preview_img");
	imagenProyecto.src = infoProyect.proyecto.imagen
		? infoProyect.proyecto.imagen
		: "https://res.cloudinary.com/nodecafe/image/upload/v1661527854/Dashboard/wundertec-logo-2_hry1os.png";
	previsualizacion.src = infoProyect.proyecto.imagen
		? infoProyect.proyecto.imagen
		: "https://res.cloudinary.com/nodecafe/image/upload/v1661527854/Dashboard/wundertec-logo-2_hry1os.png";

	drawGraphRecord(record.record[record.record.length - 1]);
	drawGraphJira(record.record);

	const checkEstado = document.querySelector("#activar-proyecto");
	checkEstado.checked = localStorage.estado === "true";

	hideLoader();
};

const verComentariosTarea = async (numero) => {
	showLoader();

	modalComentariosTareasTitulo.textContent = `Comentario de la tarea: ${dataTareas[numero].key}`;

	drawJiraTypeComment(dataTareas[numero].comentarios);

	myModal2.show(modalComentariosTareas);

	hideLoader();
};

const eliminarPersonaProyecto = async (e, idUP) => {
	showLoader();

	console.log(idUP)

	let respEliminarPersona = await delRequest("usuarioProys/", [["id", idUP]]);

	console.log(respEliminarPersona);

	e.parentNode.remove();

	hideLoader();
}

let coll = document.getElementsByClassName("collapsible");
let i;

for (i = 0; i < coll.length; i++) {
	coll[i].addEventListener("click", function () {
		this.classList.toggle("active-acordeon");
		let content = this.nextElementSibling;
		if (content.style.maxHeight) {
			content.style.maxHeight = null;
		} else {
			content.style.maxHeight = content.scrollHeight + "px";
		}
	});
}

document.querySelector("#enviarMensaje").addEventListener("click", async () => {
	const mensaje = document.querySelector("#message").value;
	const id = localStorage.getItem("projectId");
	const fecha = `${new Date().getDate()}/${
		new Date().getMonth() + 1
	}/${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`;
	const body = {
		idP: id,
		fecha: fecha,
		mensaje: mensaje,
	};

	const resp = await postRequest("mensajes/", body);

	location.reload();
});

document
	.querySelector("#activar-proyecto")
	.addEventListener("change", async () => {
		const id = localStorage.getItem("projectId");
		const estado = document.querySelector("#activar-proyecto").checked;
		const body = {
			id: id,
			estado: estado,
		};

		console.log(body);

		const resp = await putRequest("proyectos/", body);

		console.log(resp);
	});

document.querySelector("#ul-hacer").addEventListener("click", async () => {
	showLoader();

	const jira = await getRequest("proyectos/tareas/tipo/", [
		["id", localStorage.getItem("projectId")],
		["tipo", "desarrollo"],
	]);
	dataTareas = jira.tareas;
	console.log(dataTareas);
	modalTareasTitulo.textContent = "Desarrollando";

	drawJiraTypes();

	myModal.show(modalTareas);

	hideLoader();
});

document.querySelector("#ul-trabajando").addEventListener("click", async () => {
	showLoader();

	const jira = await getRequest("proyectos/tareas/tipo/", [
		["id", localStorage.getItem("projectId")],
		["tipo", "qa"],
	]);
	dataTareas = jira.tareas;
	modalTareasTitulo.textContent = "QA";

	drawJiraTypes();

	myModal.show(modalTareas);

	hideLoader();
});

document.querySelector("#ul-hecho").addEventListener("click", async () => {
	showLoader();

	const jira = await getRequest("proyectos/tareas/tipo/", [
		["id", localStorage.getItem("projectId")],
		["tipo", "listo"],
	]);
	dataTareas = jira.tareas;
	modalTareasTitulo.textContent = "Hecho";

	drawJiraTypes();

	myModal.show(modalTareas);

	hideLoader();
});

document
	.querySelector("#enviar-comentario")
	.addEventListener("click", async () => {
		showLoader();

		const comentario = document.querySelector("#nuevo-comentario").value;
		const id = document.querySelector("#id-mensaje-estatus").value;
		const fecha = `${new Date().toLocaleDateString()} ${new Date()
			.toLocaleTimeString()
			.split(":")
			.slice(0, 2)
			.join(":")}`;

		const body = {
			mensajePrincipal: id,
			fecha: fecha,
			comentario: comentario,
			usuario: localStorage.getItem("nombre"),
		};

		const respComentarios = await postRequest("comentarios/", body);

		objetoModalComentario.hide(modalComentarios);

		comentario.value = "";

		drawMessage();

		hideLoader();
	});

document.querySelector("#cargar-imagen").addEventListener("click", async () => {
	showLoader();

	const inputImg = document.querySelector("#proyect-img");

	let formdata = new FormData();
	formdata.append("imagen", inputImg.files[0]);

	var requestOptions = {
		method: "POST",
		body: formdata,
		redirect: "follow",
	};

	try {
		const response = await fetch(`${baseApi}/uploads/img`, requestOptions);

		const status = response.status;
		const data = await response.json();

		if (statusPet(status, data)) {
			const body = {
				id: localStorage.getItem("projectId"),
				imagen: data.url,
			};

			const respCambiarImagen = await putRequest(
				"proyectos/actualizarImagen/",
				body
			);

			window.location.reload();
		} else throw new Error(data);
	} catch (error) {
		console.log(error);

		mostrarNotificacion("Error", "Error al obtener los recursos.", "error");
	}

	hideLoader();
});

document.getElementById("personas").addEventListener("change", async (e) => {
	const listaPersonas = document.getElementById("personas-actuales");

	const body = {
		idU: e.target.value,
		idP: localStorage.getItem("projectId"),
		nombre: e.target.selectedOptions[0].label,
	};

	console.log(body);

	const respAddPersona = await postRequest("usuarioProys", body);

	console.log(respAddPersona);

	body.idUP = respAddPersona._id;

	drawPersonProyect(listaPersonas, body);

	e.target.remove(e.target.selectedIndex);

	$("#personas").selectpicker("destroy");
	$("#personas").selectpicker();
});

document.getElementById("proyect-img").onchange = function (evt) {
	var tgt = evt.target || window.event.srcElement,
		files = tgt.files;

	if (FileReader && files && files.length) {
		var fr = new FileReader();
		fr.onload = function () {
			document.getElementById("preview_img").src = fr.result;
		};
		fr.readAsDataURL(files[0]);
	}
};

const cambiarRol = async(retorno, idUP, rol) => {
	showLoader();

	if(retorno.value == '0'){
		hideLoader();

		retorno.value = (rol) ? rol : '0';

		throw new Error('No se puede cambiar a un rol no existente');
	}

	const body = {
		rol: retorno.value,
		id: idUP,
	};

	try{
		await putRequest('usuarioProys/', body);
	}
	catch(error){
		hideLoader();

		retorno.value = (rol) ? rol : '0';

		throw new Error('No se pudo cambiar el rol');
	}

	hideLoader();
}

main();
