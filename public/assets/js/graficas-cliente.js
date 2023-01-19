//var ctx1 = document.getElementById("chart-line").getContext("2d");
//var ctx2 = document.getElementById("chart-bar").getContext("2d");
/*
var gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);

gradientStroke1.addColorStop(1, 'rgba(33,82,255,0.1)');
gradientStroke1.addColorStop(0.2, 'rgba(33,82,255,0.0)');
gradientStroke1.addColorStop(0, 'rgba(33,82,255,0)'); //purple colors
*/
/*
const data = {
    labels: labels,
    datasets: [
        {
            label: 'Cubic interpolation (monotone)',
            data: datapoints,
            borderColor: Utils.CHART_COLORS.red,
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.4
        }, {
            label: 'Cubic interpolation',
            data: datapoints,
            borderColor: Utils.CHART_COLORS.blue,
            fill: false,
            tension: 0.4
        }, {
            label: 'Linear interpolation (default)',
            data: datapoints,
            borderColor: Utils.CHART_COLORS.green,
            fill: false
        }
    ]
};
*/
/*
new Chart(ctx1, {
    type: "line",
    data: {
        labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Tasks",
                tension: 0.3,
                pointRadius: 2,
                pointBackgroundColor: "#2152ff",
                borderColor: "#2152ff",
                borderWidth: 2,
                backgroundColor: gradientStroke1,
                data: [40, 45, 42, 41, 40, 43, 40, 42, 39],
                maxBarThickness: 6,
                fill: true
            },
            {
                label: "Tasks",
                tension: 0.3,
                pointRadius: 2,
                pointBackgroundColor: "#2152ff",
                borderColor: "#2152ff",
                borderWidth: 2,
                backgroundColor: gradientStroke1,
                data: [40, 45, 42, 41, 40, 43, 40, 42, 39].reverse(),
                maxBarThickness: 6,
                fill: true
            },
            {
                label: "Tasks",
                tension: 0.3,
                pointRadius: 2,
                pointBackgroundColor: "#2152ff",
                borderColor: "#2152ff",
                borderWidth: 2,
                backgroundColor: gradientStroke1,
                data: [21, 34, 65, 89, 54, 67, 89, 54, 67],
                maxBarThickness: 6,
                fill: true
            }
        ],
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
                    display: false,
                    drawOnChartArea: false,
                    drawTicks: false,
                },
                ticks: {
                    display: false
                }
            },
            x: {
                grid: {
                    drawBorder: false,
                    display: false,
                    drawOnChartArea: false,
                    drawTicks: false,
                },
                ticks: {
                    color: '#252f40',
                    padding: 10
                }
            },
            y: {
                grid: {
                    drawBorder: false,
                    display: false,
                    drawOnChartArea: true,
                    drawTicks: false,
                    borderDash: [5, 5]
                },
                ticks: {
                    display: true,
                    padding: 10,
                    color: '#9ca2b7'
                }
            },
            x: {
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
                    color: '#9ca2b7'
                }
            },
        },
    },
});
*/
/* new Chart(ctx2, {
    type: "doughnut",
    data: {
        labels: ['Done', 'In progress'],
        datasets: [{
            label: "Projects",
            weight: 9,
            cutout: 50,
            tension: 0.9,
            pointRadius: 2,
            borderWidth: 2,
            backgroundColor: ['#2152ff', '#a8b8d8'],
            data: [75, 25],
            fill: false
        }],
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
                    display: false,
                    drawOnChartArea: false,
                    drawTicks: false,
                },
                ticks: {
                    display: false
                }
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
                }
            },
        },
    },
}); */