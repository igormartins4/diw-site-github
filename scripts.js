function loadInformations() {
    let requisicao = new XMLHttpRequest();

    requisicao.onload = function() {
        alert('Retorno da requisição: \n' + this.responseText);
    }

    requisicao.onerror - function () {
        alert (`Erro na requisição \nCódigo: ${this.status} - ${this.statusText}`);
    }

    requisicao.open('GET', 'https://api.github.com/users/igormartins4');
    requisicao.send();
}

window.addEventListener("load", loadInformations);