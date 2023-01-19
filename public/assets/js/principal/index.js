const main = async () => {
	drawNavBar([
		"#",
		`${baseURL}/pages/proyectos/`,
		`${baseURL}/pages/usuarios/`,
		`${baseURL}/pages/projectlist/`,
	]);

	const resp = await getRequest("proyectos/", [["estado", "true"]]);
	dataTable = resp.contentM;

	drawTable(0);

	const fecha = new Date();

	let mesA = fecha.getMonth() - 4;
	let anioA = fecha.getFullYear();

	if (mesA < 1) {
		mesA = 12 + mesA;
		anioA = anioA - 1;
	}

	const records = await getRequest("records/varios/", [
		["inicio", `${mesA}/${anioA}`],
		["fin", `${fecha.getMonth() + 1}/${fecha.getFullYear()}`],
	]);

	console.log(records);
	drawRecord(records.records[0], records.records[1]);
	drawGrafica(records.records);

	hideLoader();
};

main();
