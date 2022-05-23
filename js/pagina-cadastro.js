let inputEmail = document.querySelector("#emailcadastro");
let labelEmail = document.querySelector("#label-userEmail")
let validaEmail = false

let inputSenha = document.querySelector("#senhacadastro")
let labelSenha = document.querySelector("#label-userSenha")
let validaSenha = false;

let inputRepeteSenha = document.querySelector("#repetirsenha");
let labelRepeteSenha = document.querySelector("#label-userRepeteSenha")
let validaRepetirSenha = false;

let formCadastro = document.querySelector("#formcadastro");

let regraSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

inputEmail.addEventListener("keyup", verificarEmail);
inputSenha.addEventListener("keyup", verificarSenha);
inputRepeteSenha.addEventListener("keyup", confirmaSenha);
formCadastro.addEventListener("submit", verificarInputs);

function verificarEmail() {
    if (inputEmail.value.length < 10) {
        labelEmail.style.color = "green";
        labelEmail.innerHTML = "E-mail: * Insira no mínimo 10 caracteres";
        inputEmail.style.border = "0.2px solid black";
        validaEmail = false;
    } else {
        labelEmail.style.color = "green";
        labelEmail.innerHTML = "E-mail";
        inputEmail.style.border = "0.2px solid black";
        validaEmail = true;
    }
}

function verificarSenha() {
    let senhaValida = inputSenha.value.match(regraSenha);

    if (inputSenha.value.length < 10) {
        labelSenha.style.color = "green";
        labelSenha.innerHTML = "E-mail: * Insira no mínimo 8 caracteres";
        inputSenha.style.border = "0.2px solid black";
        validaEmail = false;
    } else if (senhaValida === null) {
        labelSenha.innerHTML = "Senha: * Deve conter uma letra maiuscula e caracter";
        validaSenha = false;
    } else {
        labelSenha.style.color = "green";
        labelSenha.innerHTML = "Senha";
        inputSenha.style.border = "0.2px solid black";
        validaSenha = true;
    }
}

function confirmaSenha() {
    if (inputRepeteSenha.value !== input) {
        labelRepeteSenha.style.color = "green";
        labelRepeteSenha.innerHTML = "Confirme a senha * As senhas não correspondem";
        inputRepeteSenha.style.border = "0.2px solid black";
        validaRepetirSenha = false;
    } else {
        labelRepeteSenha.style.color = "green"
        labelRepeteSenha.innerHTML = "Confirme a senha";
        inputRepeteSenha.style.border = "0.2px solid black";
        validaRepetirSenha = true;
    }
}

function verificarInputs(e) {
    e.preventDefault();
    if(
        inputEmail.value === "" ||
        inputSenha.value === "" ||
        inputRepeteSenha.value === ""     
    ) {
        alert("Algo deu errado! Por favor verifique se preencheu todos os campos.");
        return
    } else {
        alert("Conta criada com sucesso!");
    }
    salvaLocalStorage();
}

function salvaLocalStorage() {
    let emailUser = document.querySelector("#emailcadastro").value;
    let senhaUser = inputSenha.value;
    let recadoUsers = [];
    let listaUsers = buscarListaUser()
    let dadosUser = {
        emailUser,
        senhaUser,
        recadoUsers,
    }

    console.log(dadosUser);
    listaUsers.push(dadosUser);

    atualizarUser()

    let irLogin = confirm("Deseja ir para a página de login?");

    if (irLogin) {
        window.location = "./pagina-login.html"
    }

    function buscarListaUser() {
        return JSON.parse(localStorage.getItem("usuario")) || [];
    }

    function atualizarUser() {
        return window.localStorage.setItem("usuario", JSON.stringify(listaUsers));
    }
}