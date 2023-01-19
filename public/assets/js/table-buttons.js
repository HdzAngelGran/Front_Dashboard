const buttonLeft = document.querySelector("#pag-back");
const buttonRight = document.querySelector("#pag-next");
const numberLeft = document.querySelector("#pag-num-izq");
const numberRight = document.querySelector("#pag-num-der");

buttonLeft.addEventListener('click', () => {
    const numberL = parseInt(document.querySelector("#pag-num-izq").textContent);
    const numberR = parseInt(document.querySelector("#pag-num-der").textContent);

    drawTable(numberL - 7);

    numberLeft.innerHTML = numberL - 6;
    numberRight.innerHTML = numberR - 6;
});

buttonRight.addEventListener('click', () => {
    const numberL = parseInt(document.querySelector("#pag-num-izq").textContent);
    const numberR = parseInt(document.querySelector("#pag-num-der").textContent);

    drawTable(numberR);

    numberLeft.innerHTML = numberL + 6;
    numberRight.innerHTML = numberR + 6;
});