import axios from "axios";

const botaoBuscar = document.querySelector("#botao-busca-cep");
const loader = document.querySelector("#loader");

botaoBuscar.addEventListener("click", function (event) {
  event.preventDefault();
  const cep = document.querySelector("#cep").value;

  if (cep.length === 8) {
    getAddress(cep);
  } else {
    exibeMensagensDeErro("CEP inválido! Insira um CEP com 8 dígitos.");
  }
});

async function getAddress(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  try {
    mostrarLoading();
    const resp = await axios.get(url);
    preencherCampos(resp.data);
  } catch (error) {
    exibeMensagensDeErro(error.message);
  } finally {
    esconderLoading();
  }
}

function preencherCampos(data) {
  if (data.erro) {
    exibeMensagensDeErro("CEP não encontrado.");
  } else {
    document.querySelector("#rua").value = data.logradouro || "";
    document.querySelector("#bairro").value = data.bairro || "";
    document.querySelector("#cidade").value = data.localidade || "";
    document.querySelector("#estado").value = data.uf || "";
  }
}

function mostrarLoading() {
  loader.classList.remove("hidden");
}

function esconderLoading() {
  loader.classList.add("hidden");
}

function exibeMensagensDeErro(erro) {
  const ul = document.querySelector("#mensagens-erro");
  ul.innerHTML = "";

  const li = document.createElement("li");
  li.textContent = erro;
  ul.appendChild(li);
}
