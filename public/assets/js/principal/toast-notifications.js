const toastOptions = {
    animation: true,
    delay: 5000
}

const mostrarNotificacion = (titulo, mensaje, tipoNotificacion) => {
    const titleToast = document.getElementById('toast-title');
    const msgToast = document.getElementById('toast-body');

    const toastHTMLElement = document.getElementById("toast");

    switch (tipoNotificacion) {
        case "info":
            toastHTMLElement.classList.remove("bg-success");
            toastHTMLElement.classList.remove("bg-danger");
            toastHTMLElement.classList.add("bg-warning");
            break;
        case "error":
            toastHTMLElement.classList.remove("bg-success");
            toastHTMLElement.classList.add("bg-danger");
            toastHTMLElement.classList.remove("bg-warning");
            break;
        case "success":
            toastHTMLElement.classList.add("bg-success");
            toastHTMLElement.classList.remove("bg-danger");
            toastHTMLElement.classList.remove("bg-warning");
            break;
        case "rosa":
            toastHTMLElement.classList.add("bg-primary");
            break;
        case "gris":
            toastHTMLElement.classList.add("bg-secondary");
            break;
        case "azul":
            toastHTMLElement.classList.add("bg-info");
            break;
        case "azul claro":
            toastHTMLElement.classList.add("bg-light");
            break;
        case "morado oscuro":
            toastHTMLElement.classList.add("bg-dark");
            break;
    }

    titleToast.innerHTML = titulo;
    msgToast.innerHTML = mensaje;

    const toastElement = new bootstrap.Toast(toastHTMLElement, toastOptions);

    toastElement.show();
}