const botaoAdicionar = document.querySelector("#botao-adiciona-paciente");

botaoAdicionar.addEventListener("click", function (event) {
  event.preventDefault();

  const form = document.querySelector("#form-adiciona");
  const paciente = obtemPacienteDoFormulario(form);
  const erros = validaPaciente(paciente);

  if (erros.length > 0) {
    exibeMensagensDeErro(erros);
    return;
  }

  adicionaPacienteNaTabela(paciente);

  form.reset();
  const mensagensErro = document.querySelector("#mensagens-erro");
  mensagensErro.innerHTML = "";
});

function adicionaPacienteNaTabela(paciente) {
  const pacienteTr = montaTr(paciente);
  const tabela = document.querySelector("#tabela-pacientes");
  tabela.appendChild(pacienteTr);
}

function exibeMensagensDeErro(erros) {
  const ul = document.querySelector("#mensagens-erro");
  ul.innerHTML = "";

  erros.forEach(function (erro) {
    const li = document.createElement("li");
    li.textContent = erro;
    ul.appendChild(li);
  });
}

function obtemPacienteDoFormulario(form) {
  const paciente = {
    nome: form.nome.value,
    peso: form.peso.value,
    altura: form.altura.value,
    gordura: form.gordura.value,
    imc: calculaImc(form.peso.value, form.altura.value),
    endereco: {
      cep: form.cep.value,
      rua: form.rua.value,
      bairro: form.bairro.value,
      numero: form.numero.value,
      cidade: form.cidade.value,
      estado: form.estado.value,
    },
  };

  return paciente;
}

function montaTr(paciente) {
  const pacienteTr = document.createElement("tr");
  pacienteTr.classList.add("paciente");

  const endereco = `${paciente.endereco.rua}, ${paciente.endereco.numero}, ${paciente.endereco.bairro}, ${paciente.endereco.cidade} - ${paciente.endereco.estado}`;

  pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
  pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
  pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
  pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
  pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));
  pacienteTr.appendChild(montaTd(endereco, "info-endereco"));

  return pacienteTr;
}

function montaTd(dado, classe) {
  const td = document.createElement("td");
  td.textContent = dado;
  td.classList.add(classe);

  return td;
}

function validaPaciente(paciente) {
  const erros = [];

  if (paciente.nome.length == 0) {
    erros.push("Nome não pode ser em branco!");
  }

  if (paciente.gordura.length == 0) {
    erros.push("Gordura não pode ser em branco");
  }

  if (paciente.peso.length == 0) {
    erros.push("Peso não pode ser em branco!");
  }

  if (paciente.altura.length == 0) {
    erros.push("Altura não pode ser em branco!");
  }

  if (!validaPeso(paciente.peso)) {
    erros.push("Peso inválido!");
  }

  if (!validaAltura(paciente.altura)) {
    erros.push("Altura inválida!");
  }

  if (paciente.endereco.cep.length == 0) {
    erros.push("CEP não pode ser em branco!");
  }

  if (
    paciente.endereco.rua.length === 0 ||
    paciente.endereco.cidade.length === 0 ||
    paciente.endereco.bairro.length === 0 ||
    paciente.endereco.estado.length === 0
  ) {
    erros.push("É preciso buscar o endereço via CEP!");
  }

  if (paciente.endereco.numero.length == 0) {
    erros.push("Número não pode ser em branco!");
  }

  return erros;
}
