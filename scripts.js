function loadProfile() {
  let requisicao = new XMLHttpRequest();

  requisicao.onload = function () {
    let data = JSON.parse(this.responseText);

    let profile = `
        <a href="${data.html_url}" target="_blank">
            <div class="img-descricao">
                <img src="${data.avatar_url}" alt="Foto de ${
      data.name
    }" loading="lazy">
            </div>
            <div class="container-descricao">
                <div class="descricao">
                    <h2>${data.name}</h2>
            </a>
                    <p><strong>Descrição:</strong> ${data.bio}</p>
                    <p><strong>Cidade:</strong> ${data.location}</p>
                    <p><strong>Conta criada em:</strong> ${formatDate(
                      data.created_at
                    )}</p>
                    <p><strong>${data.followers} seguidores</p>
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
    let data = JSON.parse(this.responseText);

    let repositories = "";

    for (let i = 0; i < data.length; i++) {
      repositories += `
        <article class="repos-card">
            <a href="${data[i].html_url}" target="_blank">
                <img src="./imgs/folder.svg" alt="Repositório" loading="lazy">
                <h3>${data[i].name}</h3>
            </a>
            <p>${data[i].description}</p>
            <p>Criado em: ${formatDate(data[i].created_at)}</p>
            <p>Linguagem Principal: ${data[i].language}</p>
            <p>Tamanho: ${data[i].size} Kb</p>
        </article>
      `;
    }
    document.getElementById("repositorios-github").innerHTML = repositories;

    let cardRepos = document.getElementsByClassName("repos-card");
    for (let i = 3; i < data.length; i++) {
      cardRepos[i].classList.add("card-repos-none");
    }
  };

  requisicao.onerror -
    function () {
      alert(`Erro na requisição \nCódigo: ${this.status} - ${this.statusText}`);
    };

  requisicao.open("GET", "https://api.github.com/users/igormartins4/repos");
  requisicao.send();
}

function formatDate(date) {
  var data = new Date(date),
    dia = data.getDate(date).toString(),
    diaF = dia.length == 1 ? "0" + dia : dia,
    mes = (data.getMonth() + 1).toString(), // +1 pois no getMonth Janeiro começa com zero.
    mesF = mes.length == 1 ? "0" + mes : mes,
    anoF = data.getFullYear();
  return diaF + "/" + mesF + "/" + anoF;
}

function SearchUser() {
  let userParaBuscar = document.getElementById("pesquisa-user").value;

  let requisicao = new XMLHttpRequest();

  requisicao.onload = function () {
    let data = JSON.parse(this.responseText);

    let users = "";

    for (let i = 0; i < 10; i++) {
      function loadUserInfo(user) {
        let requisicao = new XMLHttpRequest();

        requisicao.onload = async function () {
          let data = JSON.parse(this.responseText);

          users += `
            <article class="user-card">
              <a href="${data.html_url}" target="_blank">
                <div class="img-descricao">
                  <img src="${data.avatar_url}" alt="Foto de ${
            data.login
          }" loading="lazy">
                </div>
                <div class="container-descricao">
                  <div class="descricao">
                    <h2>${data.login}</h2>
              </a>
                    <p><strong>Descrição:</strong> ${data.bio}</p>
                    <p><strong>Localização:</strong> ${data.location}</p>
                    <p><strong>Conta criada em:</strong> ${formatDate(
                      data.created_at
                    )}</p>
                    <p><strong>Número de Repositórios:</strong> ${
                      data.public_repos
                    }</p>
                    <p><strong>Seguindo:</strong> ${data.following}</p>
                    <p><strong>Seguidores:</strong> ${data.followers}</p>
            </article>
            `;
        };

        requisicao.onerror -
          function () {
            alert(
              `Erro na requisição \nCódigo: ${this.status} - ${this.statusText}`
            );
          };

        requisicao.open("GET", `https://api.github.com/users/${user}`, false);
        requisicao.send();
      }

      loadUserInfo(data.items[i].login);

      document.getElementById("container-usuarios").innerHTML = users;
    }
    // let cardUsers = document.getElementsByClassName("user-card");
    // for (let i = 4; i < data.length; i++) {
    //   cardUsers[i].classList.add("card-user-none");
    // }
  };

  requisicao.onerror -
    function () {
      alert(`Erro na requisição \nCódigo: ${this.status} - ${this.statusText}`);
    };

  requisicao.open(
    "GET",
    `https://api.github.com/search/users?q=${formatString(userParaBuscar)}`
  );
  requisicao.send();
}

function formatString(user) {
  let name = user.split(" ").join("");
  name.toLowerCase();

  return name;
}

function mostraRepos() {
  let cardsRepos = document.querySelectorAll(".repos-card");
  let contador = 3;
  console.log(cardsRepos);

  for (let i = 3; i < contador + 3; i++) {
    cardsRepos[i].classList.remove("card-repos-none");
    contador += 3;
  }
}

// function mostraUsers() {
//   let cardsUsers = document.querySelectorAll(".user-card");
//   let contador = 3;
//   console.log(cardsUsers);

//   for (let i = 3; i < contador + 3; i++) {
//     cardsUsers[i].classList.remove("card-repos-none");
//     contador += 3;
//   }
// }

function loadFunctions() {
  loadProfile();
  loadRepos();
}

window.addEventListener("load", loadFunctions);

document
  .getElementById("carregar-repos")
  .addEventListener("click", mostraRepos);

// document
//   .getElementById("carregar-usuarios")
//   .addEventListener("click", mostraUsers);

let botaoPesquisar = document.getElementById("pesquisa-button");
let inputPesquisar = document.getElementById("pesquisa-user");
inputPesquisar.addEventListener("keyup", function (event) {
  if (event.code === "Enter") {
    event.preventDefault();
    botaoPesquisar.click();
  }
});
botaoPesquisar.addEventListener("click", SearchUser);
