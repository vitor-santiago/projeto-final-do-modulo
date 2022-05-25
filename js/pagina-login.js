let login = window.sessionStorage.getItem("login");

if(login) {
    alert('Já está logado!');
    window.location = "./pagina-home.html";
}

let emailInput = document.getElementById("emaillogin");
let passwordInput = document.getElementById("senhalogin");
let formLogin = document.querySelector("#formlogin");

formLogin.addEventListener("submit", verificarUsuario);

function verificarUsuario(e) {
    e.preventDefault();
    let usuarios = buscarListaUser();
    let email = emailInput.value;
    let password = passwordInput.value;

    let validaEmail = usuarios.some(
        (elemento) => elemento.emailUser === email );
    let validaSenha = usuarios.some(
        (elemento) => elemento.senhaUser === password);   
    
    if(validaEmail){
        
        if(validaSenha){

        let posicao = usuarios.findIndex((elemento) => elemento.emailUser === email);

        window.sessionStorage.setItem("login", true);
        window.sessionStorage.setItem("indexUser", posicao);
        window.location = "./pagina-home.html";
        
        }else {

            alert("Senha incorreta!")
        }
    
    } else {
        alert("E-mail incorreto!")
    }
}

function buscarListaUser() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}
