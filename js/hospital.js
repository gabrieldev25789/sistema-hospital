// elements
const cadastrarBtn = document.querySelector(".cadastrar-btn");
const nomePaciente = document.querySelector("#name");
const idadePaciente = document.querySelector("#age");
const generoSelect = document.querySelector("#gender");
const sintomas = document.querySelector("#symptoms");

const pacientesContainer = document.querySelector(".table")
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

function adicionarPacienteNaTabela(paciente) {
  // create row and cells
  const tr = document.createElement("tr");

  const tdNome = criarTd(paciente.nome);
  const tdIdade = criarTd(paciente.idade);
  const tdGenero = criarTd(paciente.genero);
  const tdSintoma = criarTd(paciente.sintomas);
  const tdId = criarTd(paciente.id ?? ""); // show id if exists

  // buttons in their own td
  const tdActions = document.createElement("td");
  const buttonEditar = criaButtonEditar();
  const buttonRemover = document.createElement("button");
  buttonRemover.classList.add("btn-remove");
  buttonRemover.textContent = "X";

  // remove event
  buttonRemover.addEventListener("click", () => {
    tr.remove();
    removerPacienteLocalStorage(paciente);
    // hide container if no rows left
    if (!tBody.querySelector("tr")) pacientesContainer.classList.add("hide");
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
  const novosPacientes = pacientesSalvos.filter((p) => p._id !== pacienteRemovido._id);
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

// initialize
carregarPacientes();
