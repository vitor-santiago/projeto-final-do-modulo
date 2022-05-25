let login = window.sessionStorage.getItem("login");

if(!login) {
    window.location = "./pagina-login.html";
}

let formCad = document.querySelector("#form-cadastro");
let users = JSON.parse(window.localStorage.getItem("usuarios"));
let userPosicao = window.sessionStorage.getItem("indexUser")
let btnSair = document.querySelector("#sair");
let descricaoInput = document.querySelector("#input-descricao");
let detalhamentoInput = document.querySelector("#input-detalhamento");
let recadoEditado = null;

mostrarRecados();

formCad.addEventListener("submit", (e) => {
    e.preventDefault();

    enviarRecado();
});

btnSair.addEventListener("click", sairLogin);

function enviarRecado() {
    let listaRecados = buscarListaUser();
    
    let recado = {
        indice: null,
        descricao: descricaoInput.value,
        detalhamento: detalhamentoInput.value
    };

    if (recado.descricao !== "" && recado.detalhamento !== "") {
        listaRecados.push(recado);
        users[userPosicao].recadoUser = listaRecados;

        atualizarUser()

        window.location.reload();
    } else {
        descricaoInput.value = "";
        detalhamentoInput.value = "";
    }
}

function mostrarRecados() {
    let listaRecados = buscarListaUser();
    console.log(listaRecados);
    if (listaRecados.length > 0) {
        for (const index in listaRecados) {
            listaRecados[index].indice = index;

            atualizarUser()

            let tabela = document.querySelector("#tabela");

            const linha = document.createElement("tr");
            linha.setAttribute("class", "linha");

            let numeroColuna = document.createElement("td");
            numeroColuna.innerText = Number(index) + 1;
            numeroColuna.setAttribute("class", "num");

            let descricaoColuna = document.createElement("td");
            descricaoColuna.setAttribute("class", "coldesc");
            descricaoColuna.innerText = listaRecados[index].descricao;

            let detalhamentoColuna = document.createElement("td");
            detalhamentoColuna.setAttribute("class", "coldet");
            detalhamentoColuna.innerText = listaRecados[index].detalhamento;

            let acaoColuna = document.createElement("td");
            acaoColuna.setAttribute("class", "acao");

            let btnEditar = document.createElement("button");
            btnEditar.setAttribute("class", "btn-editar-apagar btn-editar");
            btnEditar.setAttribute("onclick", "editarRecado(" + index +")");
            btnEditar.innerText = "Editar";

            let btnApagar = document.createElement("button");
            btnApagar.setAttribute("class", "btn-editar-apagar btn-apagar");
            btnApagar.setAttribute("onclick", "apagarRecado(" + index + ")");
            btnApagar.innerText = "Apagar";

            let criarLinha = tabela.appendChild(linha);

            criarLinha.appendChild(numeroColuna);
            criarLinha.appendChild(descricaoColuna);
            criarLinha.appendChild(detalhamentoColuna);
            let criarBotoes = criarLinha.appendChild(acaoColuna);

            criarBotoes.appendChild(btnEditar);
            criarBotoes.appendChild(btnApagar);
        }
        return;
    } else {
        return;
    }
}

function sairLogin() {
    window.sessionStorage.clear();
    window.location = "./pagina-login.html";
}

function editarRecado(indiceDoRecado) {
    let listaRecados = buscarListaUser();
    descricaoInput.value = listaRecados[indiceDoRecado].descricao;
    detalhamentoInput.value = listaRecados[indiceDoRecado].detalhamento;
    recadoEditado = listaRecados[indiceDoRecado];
    formCad.removeEventListener("submit", enviarRecado);
    formCad.addEventListener("submit", substituirRecado);
}

function substituirRecado() {
    let listaRecados = buscarListaUser();
    let atualiza = confirm("Deseja atualizar seu recado?");
    if (atualiza) {
        recadoEditado.descricao = descricaoInput.value;
        recadoEditado.detalhamento = detalhamentoInput.value;
        listaRecados[recadoEditado.indice] = recadoEditado;
        atualizarUser()
        window.location.reload();
    
    } else{
        descricaoInput.value = "";
        detalhamentoInput.value = "",
        formCad.removeEventListener("submit", substituirRecado);
        formCad.addEventListener("submit", enviarRecado);
    }
} 

function apagarRecado(indiceDoRecado) {
    let listaRecados = buscarListaUser();
    let apaga = confirm("Deseja apagar o seu recado?");

    if (apaga) {
        listaRecados.splice([indiceDoRecado], 1);
        atualizarUser()
        window.location.reload();
        return;
    } else {
        return;
    }
}

function buscarListaUser() {
    return users[userPosicao].recadoUser || []
}

function atualizarUser() {
    return window.localStorage.setItem("usuarios", JSON.stringify(users));
}