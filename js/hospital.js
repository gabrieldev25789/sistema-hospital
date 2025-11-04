const cadastrarBtn = document.querySelector(".cadastrar-btn")
const nomePaciente = document.querySelector("#name")
const idadePaciente = document.querySelector("#age")

const generoSelect = document.querySelector("#gender")

const sintomas = document.querySelector("#symptoms")

const table = document.querySelector(".table")

const pacientesContainer = document.querySelector(".table")

const tBody = document.querySelector("#tbody")

function carregarPacientes() {
  const pacientesSalvos = JSON.parse(localStorage.getItem("pacientes")) || []
  pacientesSalvos.forEach((paciente) => {
    adicionarPacienteNaTabela(paciente)
  })
  if (pacientesSalvos.length > 0) {
    pacientesContainer.classList.remove("hide")
  }
}

function adicionarPacienteNaTabela(paciente) {

  const tr = document.createElement("tr")
  const tdNome = document.createElement("td")
  const tdIdade = document.createElement("td")
  const tdGenero = document.createElement("td")
  const tdSintoma = document.createElement("td")

  tdNome.textContent = paciente.nome
  tdIdade.textContent = paciente.idade
  tdGenero.textContent = paciente.genero
  tdSintoma.textContent = paciente.sintomas

   const buttonEditar = document.createElement("button")
  buttonEditar.classList.add("btn-edit")
  buttonEditar.textContent = "Editar"

  const buttonRemover = document.createElement("button")
  buttonRemover.classList.add("btn-remove")
  buttonRemover.textContent = "X"

  // Evento de remover paciente
  buttonRemover.addEventListener("click", () => {
    tr.remove()
    removerPacienteLocalStorage(paciente)
  })

  tr.appendChild(tdNome)
  tr.appendChild(tdIdade)
  tr.appendChild(tdGenero)
  tr.appendChild(tdSintoma)
  tr.appendChild(buttonEditar)
  tr.appendChild(buttonRemover)

  table.appendChild(tr)
}

function cadastrarPaciente() {
  cadastrarBtn.addEventListener("click", (e) => {
    e.preventDefault()
    pacientesContainer.classList.remove("hide")

    const paciente = {
      nome: nomePaciente.value,
      idade: idadePaciente.value,
      genero: generoSelect.value,
      sintomas: sintomas.value,
    }

    adicionarPacienteNaTabela(paciente)
    salvarPacienteLocalStorage(paciente)
    LimparCampos()
  })
}

function salvarPacienteLocalStorage(paciente) {
  const pacientesSalvos = JSON.parse(localStorage.getItem("pacientes")) || []
  pacientesSalvos.push(paciente)
  localStorage.setItem("pacientes", JSON.stringify(pacientesSalvos))
  /*editarPaciente(paciente)*/
}

function removerPacienteLocalStorage(pacienteRemovido) {
  const pacientesSalvos = JSON.parse(localStorage.getItem("pacientes")) || []
  const novosPacientes = pacientesSalvos.filter(
    (p) =>
      !(
        p.nome === pacienteRemovido.nome &&
        p.idade === pacienteRemovido.idade &&
        p.genero === pacienteRemovido.genero &&
        p.sintomas === pacienteRemovido.sintomas
      )
  )
  localStorage.setItem("pacientes", JSON.stringify(novosPacientes))
}

function LimparCampos() {
  nomePaciente.value = ""
  idadePaciente.value = ""
  generoSelect.value = ""
  sintomas.value = ""
}

/*
function editarPaciente(paciente){

    buttonEditar.addEventListener("click", () =>{
    console.log(paciente)
    nomePaciente.value = paciente.nome 
    idadePaciente.value = paciente.idade 
    generoSelect.value = paciente.genero
    sintomas.value = paciente.sintomas
    removerPacienteLocalStorage(paciente)
    })
}
*/ 

// Inicialização
carregarPacientes()
cadastrarPaciente()

