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
formCadastro.addEventListener("submit", (e) => {
     e.preventDefault();

    verificarInputs();
});

function verificarEmail() {
    if (inputEmail.value.length < 10) {
        labelEmail.style.color = "red";
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

    if (inputSenha.value.length < 8) {
        labelSenha.style.color = "red";
        labelSenha.innerHTML = "Senha: * Insira no mínimo 8 caracteres";
        inputSenha.style.border = "0.2px solid black";
        validaSenha = false;
    
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
    if (inputRepeteSenha.value !== inputSenha.value) {
        labelRepeteSenha.style.color = "red";
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

function verificarInputs() {
    
    if(
        inputEmail.value === "" ||
        inputSenha.value === "" ||
        inputRepeteSenha.value === ""     
    ) {
        alert("Algo deu errado! Por favor verifique se preencheu todos os campos.");
        return
    
    } else if (
        !validaEmail ||
        !validaSenha ||
        !validaRepetirSenha
    ) {
        alert("Campos incorretos! Por favor verifique se você preencheu todos os campos.");
        return
    
    } else {
       
        
        salvaLocalStorage();    
    }
}

function salvaLocalStorage() {
    
    let emailUser = document.querySelector("#emailcadastro").value;
    let senhaUser = inputSenha.value;
    let recadoUsers = [];
    let listaUsers = buscarListaUser();
    
    let existe = listaUsers.some((usuarios) => usuarios.emailUser === emailUser);

    if (existe) {
        alert(`Usuário ${emailUser} já cadastrado no sistema`);
        return
    }

    let dadosUser = {
        emailUser,
        senhaUser,
        recadoUsers,
    }

    console.log(dadosUser);
    listaUsers.push(dadosUser);

    atualizarUser(listaUsers)

    alert("Conta criada com sucesso!")

    let irLogin = confirm("Deseja ir para a página de login?");

    if (irLogin) {
        window.location = "./pagina-login.html"
    }

    function buscarListaUser() {
        return JSON.parse(localStorage.getItem("usuarios")) || [];
    }

    function atualizarUser(listaUsers) {
        window.localStorage.setItem("usuarios", JSON.stringify(listaUsers));
    }
}