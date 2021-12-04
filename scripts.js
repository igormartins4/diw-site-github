function loadProfile() {
  let requisicao = new XMLHttpRequest();

  requisicao.onload = function () {
    // alert("Retorno da requisição: \n" + this.responseText);

    let data = JSON.parse(this.responseText);

    let profile = `
        <div class="img-descricao">
            <img src="${data.avatar_urlxxxxxxxxxxxxxx}" alt="Foto de ${data.name}" loading="lazy">
        </div>
        <div class="container-descricao">
            <div class="descricao">
                <h2>${data.name}</h2>
                <p><strong>Descrição:</strong> ${data.bio}</p>
                </div>
                    <!-- <div class="container-sociais">
                        <h2>Redes Sociais</h2>
                        <div class="redes-sociais">
                            <a href="https://www.facebook.com/">
                                <img src="./imgs/facebook.svg" alt="Logo Facebook" loading="lazy">
                            </a>
                            <a href="https://twitter.com/">
                                <img src="./imgs/twitter.svg" alt="Logo Twitter" loading="lazy">
                            </a>
                            <a href="https://instagram.com/">
                                <img src="./imgs/instagram.svg" alt="Logo Instagram" loading="lazy">
                            </a>
                        </div>
                    </div> -->
                </div>
    `;
    document.getElementById("perfil").innerHTML = profile;
  };

  requisicao.onerror -
    function () {
      alert(`Erro na requisição \nCódigo: ${this.status} - ${this.statusText}`);
    };

  requisicao.open("GET", "https://api.github.com/users/igormartins4");
  requisicao.send();
}

function loadRepos() {
  let requisicao = new XMLHttpRequest();

  requisicao.onload = function () {
    // alert("Retorno da requisição: \n" + this.responseText);

    let data = JSON.parse(this.responseText);

    let repositories = "";

    for (let i = 0; i < data.length; i++) {
      repositories += `
        <article>
            <a href="${data[i].html_url}" target="_blank">
                <img src="./imgs/folder.svg" alt="Repositório" loading="lazy">
                <h3>${data[i].name}</h3>
            </a>
            <p>${data[i].description}</p>
              <p>Criado em: ${formatedDate(data[i].created_at)}</p>
        </article>
      `;
    }

    document.getElementById("repositorios-github").innerHTML = repositories;
  };

  requisicao.onerror -
    function () {
      alert(`Erro na requisição \nCódigo: ${this.status} - ${this.statusText}`);
    };

  requisicao.open("GET", "https://api.github.com/users/igormartins4/repos");
  requisicao.send();
}

function formatedDate() {
  var data = new Date(),
    dia = data.getDate().toString(),
    diaF = dia.length == 1 ? "0" + dia : dia,
    mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
    mesF = mes.length == 1 ? "0" + mes : mes,
    anoF = data.getFullYear();
  return diaF + "/" + mesF + "/" + anoF;
}

function loadFunctions() {
  loadProfile();
  loadRepos();
}

window.addEventListener("load", loadFunctions);
