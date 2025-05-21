const titulo = document.querySelector(".titulo");
titulo.textContent = "Sistema Nutrição";

const pacientes = document.querySelectorAll(".paciente");

for (let i = 0; i < pacientes.length; i++) {
  const paciente = pacientes[i];
  const tdPeso = paciente.querySelector(".info-peso");
  const peso = tdPeso.textContent;
  const tdAltura = paciente.querySelector(".info-altura");
  const altura = tdAltura.textContent;
  const tdImc = paciente.querySelector(".info-imc");
  const pesovalido = validaPeso(peso);
  const alturavalida = validaAltura(altura);

  if (!pesovalido) {
    tdImc.textContent = "Peso Inválido!";
    pesovalido = false;
    paciente.classList.add("paciente-invalido");
  }

  if (!alturavalida) {
    tdImc.textContent = "Altura Inválida!";
    alturavalida = false;
    paciente.classList.add("paciente-invalido");
  }

  if (alturavalida && pesovalido) {
    const imc = peso / (altura * altura);
    tdImc.textContent = imc.toFixed(2);
  }
}

function validaPeso(peso) {
  if (peso >= 0 && peso <= 600) {
    return true;
  } else {
    return false;
  }
}

function validaAltura(altura) {
  if (altura >= 0 && altura <= 3) {
    return true;
  } else {
    return false;
  }
}

function calculaImc(peso, altura) {
  const imc = peso / (altura * altura);

  return imc.toFixed(2);
}
