// elements
const cadastrarBtn = document.querySelector(".cadastrar-btn");
const nomePaciente = document.querySelector("#name");
const idadePaciente = document.querySelector("#age");
const generoSelect = document.querySelector("#gender");
const sintomas = document.querySelector("#symptoms");

const pacientesContainer = document.querySelector(".table");
const table = document.querySelector(".table"); // outer table element (if you have one)
const tBody = document.querySelector("#tbody"); // prefer appending rows to tbody

// load existing patients on page load
function carregarPacientes() {
  const pacientesSalvos = JSON.parse(localStorage.getItem("pacientes")) || [];
  pacientesSalvos.forEach((paciente) => {
    adicionarPacienteNaTabela(paciente);
  });
  if (pacientesSalvos.length > 0) {
    pacientesContainer.classList.remove("hide");
  }
}

function criaButtonEditar() {
  const buttonEditar = document.createElement("button");
  buttonEditar.classList.add("btn-edit");
  buttonEditar.textContent = "Editar";
  return buttonEditar;
}

function criarTd(text = "") {
  const td = document.createElement("td");
  td.textContent = text;
  return td;
}

function criaTr(){
  const tr = document.createElement("tr");
  return tr;
}

function adicionarPacienteNaTabela(paciente) {
  // create row and cells
  const tr = criaTr();

  const tdNome = criarTd(paciente.nome);
  const tdIdade = criarTd(paciente.idade);
  const tdGenero = criarTd(paciente.genero);
  const tdSintoma = criarTd(paciente.sintomas);
  const tdId = criarTd(paciente.id ?? ""); // show id if exists

  // buttons in their own td
  const tdActions = document.createElement("td");
  const buttonEditar = criaButtonEditar();

  // <-- buttonRemover MUST be criado por linha
  const buttonRemover = document.createElement("button");
  buttonRemover.classList.add("btn-remove");
  buttonRemover.textContent = "X";

  // remove event: abrir modal de confirmação que, ao confirmar, remove a linha e do storage
  buttonRemover.addEventListener("click", () => {
    confirmarRemocao(paciente, tr);
  });

  // edit event
  buttonEditar.addEventListener("click", () => {
    editarPaciente(paciente, tr);
  });

  tdActions.appendChild(buttonEditar);
  tdActions.appendChild(buttonRemover);

  // append cells to row
  tr.appendChild(tdNome);
  tr.appendChild(tdIdade);
  tr.appendChild(tdGenero);
  tr.appendChild(tdSintoma);
  tr.appendChild(tdId);
  tr.appendChild(tdActions);

  // append to tbody (preferred) or table as fallback
  if (tBody) tBody.appendChild(tr);
  else table.appendChild(tr);
}

function validarCampos() {
  // return true if valid, false otherwise
  if (
    !nomePaciente.value.trim() ||
    !idadePaciente.value.trim() ||
    !generoSelect.value.trim() ||
    !sintomas.value.trim()
  ) {
    console.log("Campos incompletos");
    return false;
  }
  return true;
}

// handle Enter key on inputs (use keydown, not click)
document.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    // prevent form submit default if inside <form>
    e.preventDefault();
    if (validarCampos()) cadastrarPaciente();
  }
});

cadastrarBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!validarCampos()) return;
  cadastrarPaciente();
});

function cadastrarPaciente() {
  pacientesContainer.classList.remove("hide");

  // add a unique id to each patient (helps editing/removing reliably)
  const paciente = {
    id: Date.now().toString(),
    nome: nomePaciente.value.trim(),
    idade: idadePaciente.value.trim(),
    genero: generoSelect.value,
    sintomas: sintomas.value.trim(),
  };

  adicionarPacienteNaTabela(paciente);
  salvarPacienteLocalStorage(paciente);
  limparCampos();
}

function salvarPacienteLocalStorage(paciente) {
  const pacientesSalvos = JSON.parse(localStorage.getItem("pacientes")) || [];
  pacientesSalvos.push(paciente);
  localStorage.setItem("pacientes", JSON.stringify(pacientesSalvos));
}

function removerPacienteLocalStorage(pacienteRemovido) {
  const pacientesSalvos = JSON.parse(localStorage.getItem("pacientes")) || [];
  // comparar por 'id' (sem underscore) — era o bug
  const novosPacientes = pacientesSalvos.filter((p) => p.id !== pacienteRemovido.id);
  localStorage.setItem("pacientes", JSON.stringify(novosPacientes));
}

function limparCampos() {
  nomePaciente.value = "";
  idadePaciente.value = "";
  generoSelect.value = "";
  sintomas.value = "";
}

function editarPaciente(paciente, linha) {
  // fill fields
  nomePaciente.value = paciente.nome;
  idadePaciente.value = paciente.idade;
  generoSelect.value = paciente.genero;
  sintomas.value = paciente.sintomas;

  // hide list while editing
  pacientesContainer.classList.add("hide");

  // remove the row and remove from storage so save will re-add edited version
  linha.remove();
  removerPacienteLocalStorage(paciente);

  // optionally, focus the first input
  nomePaciente.focus();
}

function criaButtonConfirmar(){
  const buttonConfirmar = document.createElement("button");
  buttonConfirmar.id = "confirmar-remocao-btn";
  buttonConfirmar.textContent = "Confirmar";
  return buttonConfirmar;
}

function criaButtonCancelar(){
  const buttonCancelar = document.createElement("button");
  buttonCancelar.id = "cancelar-remocao-btn";
  buttonCancelar.textContent = "Cancelar";
  return buttonCancelar;
}

// nova versão: recebe o paciente e a linha (tr) e só remove no click do Confirmar
function confirmarRemocao(paciente, tr) {
  // criar modal simples
  const container = document.createElement("div");
  container.id = "div-remocao";

  const box = document.createElement("div");
  box.id = "box-remocao"

  const h2 = document.createElement("h2");
  h2.id = "remocao-h2";
  h2.textContent = "Deseja mesmo remover paciente?";

  const btnConfirmar = criaButtonConfirmar();
  const btnCancelar = criaButtonCancelar();

  // confirmar: remove row e do storage, fecha modal e verifica se esconde o container principal
  btnConfirmar.addEventListener("click", () => {
    tr.remove();
    removerPacienteLocalStorage(paciente);
    document.body.removeChild(container);
    // hide container if no rows left
    if (!tBody.querySelector("tr")) pacientesContainer.classList.add("hide");
  });

  btnCancelar.addEventListener("click", () => {
    document.body.removeChild(container);
  });

  box.appendChild(h2);
  // order: cancelar, confirmar (igual ao seu original, opcional)
  box.appendChild(btnCancelar);
  box.appendChild(btnConfirmar);
  container.appendChild(box);
  document.body.appendChild(container);
}

// initialize
carregarPacientes();
