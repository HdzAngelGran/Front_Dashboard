document.getElementById('usr-img').onchange = function (evt) {
    var tgt = evt.target || window.event.srcElement,
        files = tgt.files;
    
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            document.getElementById("preview_img").src = fr.result;
        }
        fr.readAsDataURL(files[0]);
    }
}

const registrarUsuario = async () => {
    let errorMsg = document.getElementById("msg-error");

    if(validarForm()){
        let validarImagen = await Promise.resolve(subirImagen());
        if(validarImagen){
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("jwt", localStorage.getItem("token"));

            const formData = new FormData(document.querySelector('form'))

            let raw = JSON.stringify(Object.fromEntries(formData));

            console.log(raw);

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };


            const response = await fetch(`${baseApi}/usuarios/first/login/`, requestOptions);
            const respStatus = response.status
            const resp = await response.json();

            if(statusPet(respStatus)){
                errorMsg.classList.add("d-none");
                window.location.replace(`${baseURL}/pages/login/`);
            }
            else{
                errorMsg.classList.remove("d-none");
                errorMsg.innerHTML = resp.msg;
            }
        }
        else{
            
        }
    }
}

const validarForm = () => {
    let result = true;
    let nodeList = document.querySelectorAll(".form-control");
    nodeList.forEach(e => {
        let error = e.parentElement.querySelector(".error-vacio");
        error.classList.add("d-none");
        if (!e.value) {
            error.classList.remove("d-none");
            result = false;
        }
    })
    return result;
}

const subirImagen = async () => {
    document.querySelector("#url-img").parentElement.querySelector(".error-vacio").classList.add("d-none");
    const inputImg = document.querySelector("#usr-img");
    if(!inputImg.value){
        document.querySelector("#url-img").parentElement.querySelector(".error-vacio").classList.remove("d-none");
        return false
    }
    
    let formdata = new FormData();
    formdata.append("imagen", inputImg.files[0])

    var myHeaders = new Headers();
    myHeaders.append("jwt", localStorage.getItem("token"));

    var requestOptions = {
        method: 'POST',
        body: formdata,
        headers: myHeaders,
        redirect: 'follow'
    };

    await fetch(`${baseApi}/uploads/img/`, requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        document.querySelector("#url-img").value = result.url;
    })
    .catch(error => {
        console.log('error', error)
        return false;
    });

    return true;
}

document.querySelector("form").addEventListener("submit", function(event){
    event.preventDefault()
});