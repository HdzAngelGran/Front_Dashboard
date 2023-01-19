const proyA = document.querySelector('#proyectosA');
const proyT = document.querySelector('#proyectosT');
const usuarios = document.querySelector('#usuarios');
const equipo = document.querySelector('#equipo');
const meses = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic'
];

const drawTable = (counter) => {
    if (counter < 0){
        mostrarNotificacion("¡Espera!", "La tabla comienza en 1.", "info");

        throw new Error("La tabla comienza en 1")
    }
    if (dataTable.length <= counter){
        mostrarNotificacion("¡Espera!", `El límite de proyectos es ${dataTable.length}`, "info");

        throw new Error(`El límite de proyectos es ${dataTable.length}`);
    }

    const tbody = document.getElementById('proyectos-actuales');
    const imagePlaceholder = document.getElementById('placeholder-table');
    const tfooter = document.getElementById('tfooter');

    imagePlaceholder.classList.add("d-none");
    tfooter.classList.remove("d-none");

    tbody.innerHTML = '';

    for (let i = counter; i < dataTable.length && i < counter + 6; i++) {
        const tr = document.createElement('tr');

        console.log(dataTable[i]);

        const td1 = `<td class="w-30">
                <div class="d-flex px-2 py-1 align-items-center mano" onclick="tareasPage('${dataTable[i]._id}', '${dataTable[i].estado}')">
                    <div>
                        <img class="logo-proyecto" src="${dataTable[i].imagen}" alt="Country flag">
                    </div>
                    <div class="ms-4">
                        <p class="text-xs font-weight-bold mb-0">Proyecto:</p>
                        <h6 class="text-sm mb-0">${dataTable[i].nombre}</h6>
                    </div>
                </div>
            </td>`;
        const td2 = `<td>
                    <div class="text-center">
                        <p class="text-xs font-weight-bold mb-0">Usuarios:</p>
                        <h6 class="text-sm mb-0">230,900</h6>
                    </div>
                </td>`;
        const td3 = `<td class="align-middle text-sm">
                    <div class="col text-center">
                        <p class="text-xs font-weight-bold mb-0">Status:</p>
                        <h6 class="text-sm mb-0 ${(dataTable[i].record.toFixed(2) < 50) 
                            ? (dataTable[i].record.toFixed(2) < 25)
                                ? 'text-danger'
                                : 'text-warning'
                            : 'text-success'}">${dataTable[i].record.toFixed(2)}%</h6>
                    </div>
                </td>`;

        tr.innerHTML = td1 + td2;

        tbody.appendChild(tr);
    }
}

const drawSpanRecord = (record, recordA) => {
    const span = document.createElement('span');
    span.classList.add('font-weight-bolder');
    span.classList.add('text-sm');

    let rest = 0;

    if(recordA === 0)
        rest = 0;
    else
        rest = (record - recordA) / recordA;

    if(rest < 0){
        span.classList.add('text-danger');
        span.textContent = ` ${(rest * 100).toFixed(1)}%`;
    }
    if(rest === 0){
        span.classList.add('text-warning');
        span.textContent = ` +${(rest * 100).toFixed(1)}%`;
    }
    if(rest > 0){
        span.classList.add('text-success');
        span.textContent = ` +${(rest * 100).toFixed(1)}%`;
    }

    return span;
}

const drawRecord = (record, recordA) => {
    proyA.innerHTML = record.proyectos;
    proyT.innerHTML = record.clientes;
    usuarios.innerHTML = record.usuarios;
    equipo.innerHTML = record.equipo;

    if(recordA){
        const spanPA = drawSpanRecord(record.proyectos, recordA.proyectos);
        proyA.appendChild(spanPA);

        const spanPT = drawSpanRecord(record.clientes, recordA.clientes);
        proyT.appendChild(spanPT);

        const spanU = drawSpanRecord(record.usuarios, recordA.usuarios);
        usuarios.appendChild(spanU);

        const spanE = drawSpanRecord(record.equipo, recordA.equipo);
        equipo.appendChild(spanE);

    }
}

const drawGrafica = (records = []) => {
    const ctx2 = document.getElementById("chart-line").getContext("2d");

    const gradientStroke1 = ctx2.createLinearGradient(0, 230, 0, 50);

    gradientStroke1.addColorStop(1, 'rgba(203,12,159,0.2)');
    gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)');
    gradientStroke1.addColorStop(0, 'rgba(203,12,159,0)'); //purple colors

    const gradientStroke2 = ctx2.createLinearGradient(0, 230, 0, 50);

    gradientStroke2.addColorStop(1, 'rgba(20,23,39,0.2)');
    gradientStroke2.addColorStop(0.2, 'rgba(72,72,176,0.0)');
    gradientStroke2.addColorStop(0, 'rgba(20,23,39,0)'); //purple colors

    const labels = records.map(record => {
        const date = record.fecha.split('/');

        return meses[parseInt(date[0]) - 1];
    }).reverse();

    const dataGraf = [
        records.map(record => {
            return record.proyectos;
        }).reverse(),
        records.map(record => {
            return record.clientes;
        }).reverse()
    ];

    new Chart(ctx2, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Proyectos Actuales",
                tension: 0.4,
                borderWidth: 0,
                pointRadius: 0,
                borderColor: "#cb0c9f",
                borderWidth: 3,
                backgroundColor: gradientStroke1,
                fill: true,
                data: dataGraf[0],
                maxBarThickness: 6

            }, {
                label: "Proyectos Totales",
                tension: 0.4,
                borderWidth: 0,
                pointRadius: 0,
                borderColor: "#3A416F",
                borderWidth: 3,
                backgroundColor: gradientStroke2,
                fill: true,
                data: dataGraf[1],
                maxBarThickness: 6
            },],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
            scales: {
                y: {
                    grid: {
                        drawBorder: false,
                        display: true,
                        drawOnChartArea: true,
                        drawTicks: false,
                        borderDash: [5, 5]
                    },
                    ticks: {
                        display: true,
                        padding: 10,
                        color: '#b2b9bf',
                        font: {
                            size: 11,
                            family: "Open Sans",
                            style: 'normal',
                            lineHeight: 2
                        },
                    }
                },
                x: {
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false,
                        borderDash: [5, 5]
                    },
                    ticks: {
                        display: true,
                        color: '#b2b9bf',
                        padding: 20,
                        font: {
                            size: 11,
                            family: "Open Sans",
                            style: 'normal',
                            lineHeight: 2
                        },
                    }
                },
            },
        },
    });
}
