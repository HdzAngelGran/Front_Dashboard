createCustomSelect = (selector) => {
	let selectBtn;
	let optionsSelect;
	let busquedaSelect;
	let datos = [];
	let select;
	let customSelectWrapper;
	let selectContent;
	let arregloOpciones;

	//Se obtiene el select que se va a modificar
	select = document.querySelector(selector);
	let placeholder = select.getAttribute("data-placeholder");
	let placeholderBusqueda = select.getAttribute("data-placeholder-busqueda");

	//Se obtiene el padre de este select para añadir un div que envuelva todo el select
	let parent = select.parentNode;

	//Se crea el div que va a envolver todo
	customSelectWrapper = document.createElement("div");
	customSelectWrapper.className = "custom-select";

	//Creamos elementos del select custom
	selectBtn = document.createElement("div");
	selectBtn.className = "form-select cursor-pointer select-btn";
	selectBtn.innerHTML = `<span>${
		placeholder ? placeholder : "Seleccione"
	}</span>`;

	selectContent = document.createElement("div");
	selectContent.className = "select-content";

	divBusqueda = document.createElement("div");
	divBusqueda.className = "input-group";
	divBusqueda.innerHTML =
		'<span class="input-group-text"><i class="fa fa-search" aria-hidden="true"></i></span>';

	busquedaSelect = document.createElement("input");
	busquedaSelect.className = "form-control select-busqueda";
	busquedaSelect.setAttribute("type", "text");
	busquedaSelect.setAttribute(
		"placeholder",
		placeholderBusqueda ? placeholderBusqueda : "Buscar"
	);

	optionsSelect = document.createElement("ul");
	optionsSelect.className = "select-options";

	select.querySelectorAll("option").forEach((e) => {
		datos.push(e.innerHTML);
	});

	//Se remplaza el padre
	parent.replaceChild(customSelectWrapper, select);
	customSelectWrapper.appendChild(select);
	customSelectWrapper.appendChild(selectBtn);
	divBusqueda.appendChild(busquedaSelect);
	selectContent.appendChild(divBusqueda);
	selectContent.appendChild(optionsSelect);
	customSelectWrapper.appendChild(selectContent);

	addOption(optionsSelect, datos);

	busquedaSelect.addEventListener("keyup", (e) => {
		let raiz = e.target.closest(".custom-select");
		let arr = [];
		let busquedaVal = e.target.value.toLowerCase();
		arr = datos
			.filter((data) => {
				return data.toLowerCase().startsWith(busquedaVal);
			})
			.map((data) => `<li onclick="updateOption(this)">${data}</li>`)
			.join("");

		raiz.querySelector(".select-options").innerHTML = arr
			? arr
			: `<p>No se encontraron resultados 🙁</p>`;
	});

	selectBtn.addEventListener("click", (e) => {
		e.target.parentNode.classList.toggle("active");
	});
};

addOption = (optionsSelect, datos) => {
	optionsSelect.innerHTML = "";
	datos.forEach((data) => {
		let li = `<li onclick="updateOption(this)">${data}</li>`;
		optionsSelect.insertAdjacentHTML("beforeend", li);
	});
};

updateOption = (selectedLi) => {
	let raiz = selectedLi.closest(".custom-select");
	let select = raiz.querySelector("select");

	raiz.querySelector(".select-busqueda").value = "";

	selectedLi.parentNode.querySelectorAll("li").forEach((e) => {
		e.classList.remove("selected");
	});

	selectedLi.classList.toggle("selected");
	raiz.classList.toggle("active");

	raiz.querySelector(".select-btn").firstElementChild.innerText =
		selectedLi.innerText;

	select.selectedIndex = Array.from(
		selectedLi.parentNode.querySelectorAll("li")
	).indexOf(selectedLi);

	console.log(
		Array.from(selectedLi.parentNode.querySelectorAll("li")).indexOf(
			selectedLi
		)
	);

	select.dispatchEvent(new Event("change"));
};
