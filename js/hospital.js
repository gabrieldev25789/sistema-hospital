// elements
const cadastrarBtn = document.querySelector(".cadastrar-btn");
const nomePaciente = document.querySelector("#name");
const idadePaciente = document.querySelector("#age");
const generoSelect = document.querySelector("#gender");
const sintomas = document.querySelector("#symptoms");

const pacientesContainer = document.querySelector(".table");
const table = document.querySelector(".table"); 
const tBody = document.querySelector("#tbody"); 

const aviso = document.querySelector("#aviso")

const tokenSession = document.querySelector("#token-session")
const listaSession = document.querySelector("#lista-session") 

const token = document.querySelector("#token")
const tokenButton = document.querySelector("#confirmar-token")

const painel = document.querySelector(".panel")
const painel2 = document.querySelector(".panel2")

const olharLista = document.querySelector("#pacientes")
const dashboard = document.querySelector("#dashboard")
const medicos = document.querySelector("#medicos")

const cardList = document.querySelector(".list-card")

const sideBar = document.querySelector(".sidebar")

const resetBtn = document.querySelector("#reset-btn")

const containerAviso = document.querySelector("#container-aviso")

dashboard.addEventListener("click", () =>{
  [aviso, painel, painel2].forEach((el)=> el.classList.add("hide"))

  tokenSession.classList.remove("hide")
})

if(cardList)[painel, painel2, cardList].forEach((el) => el.classList.add("hide"))

nomePaciente.addEventListener("input", () => {
  nomePaciente.value = nomePaciente.value.replace(/\d/g, "")
});

function confirmarToken(){
  const tokenValue = token.value
  if(!tokenValue){
    aviso.classList.remove("hide")
    aviso.textContent = "Preencha o token"
    setTimeout(()=>{aviso.classList.add("hide")}, 1000)
    return 
  } 

  if(tokenValue === "Admin"){
    aviso.classList.remove("hide")
    aviso.textContent = "Acesso permitido"
    setTimeout(()=>{aviso.classList.add("hide")}, 1000)
    containerAviso.classList.add("green")
    aviso.classList.add("green")
    tokenSession.classList.add("hide")
    painel.classList.remove("hide")  
    painel2.classList.add("hide")

  const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

  if(pacientes.length > 0) {
  painel2.classList.remove("hide");
  } else {
    painel2.classList.add("hide");
    aviso.classList.remove("hide")
  }

  } else if(tokenValue !== "Admin"){
    containerAviso.classList.remove("green")
    aviso.classList.remove("green")
    aviso.classList.remove("hide")
    aviso.textContent = "Token invalido"
    token.value = ""

    setTimeout(()=>{aviso.classList.add("hide")}, 1000)

    return    
  }
  
  if(!painel.classList.contains("hide") && !painel2.classList.contains("hide")){
    tokenSession.classList.add("hide")
  }
  token.value = ""

  if(cardList.classList.contains("hide")) painel2.classList.add("hide")

    const tBodyAll = tBody.querySelectorAll("tr")
    tBodyAll.forEach((el)=>{
    el.lastChild.classList.remove("hide")
  })
}

tokenButton.addEventListener("click", () =>{
  confirmarToken()
})


const pacientesSalvos = JSON.parse(localStorage.getItem("pacientes")) || [];

function carregarPacientes() {
  pacientesSalvos.forEach((paciente) => {
    adicionarPacienteNaTabela(paciente);
  });
  if (pacientesSalvos.length > 0) {
    pacientesContainer.classList.remove("hide");
  }
}

function criaButtonEditar() {
  const buttonEditar = document.createElement("button");
  buttonEditar.classList.add("btn");
  buttonEditar.id = "btn-edit"
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

  let estagio

function adicionarPacienteNaTabela(paciente) {
  
  const tr = criaTr();

  const tdNome = criarTd(paciente.nome);
  const tdIdade = criarTd(paciente.idade);
  const tdGenero = criarTd(paciente.genero);
  const tdSintoma = criarTd(paciente.sintomas);
  const tdId = criarTd(paciente.id ?? ""); 

  const tdActions = document.createElement("td");
  const buttonEditar = criaButtonEditar();

  const buttonRemover = document.createElement("button");
  buttonRemover.classList.add("btn")
  buttonRemover.id = "btn-remove"
  buttonRemover.textContent = "Remover";

  buttonRemover.addEventListener("click", () => {
    confirmarRemocao(paciente, tr);
  });

function editarPaciente(paciente, linha) {  
  sideBar.classList.add("hidden")
  estagio = 2 
  cadastrarBtn.textContent = "Salvar alteração"

  nomePaciente.value = paciente.nome;
  idadePaciente.value = paciente.idade;
  generoSelect.value = paciente.genero;
  sintomas.value = paciente.sintomas;

  pacientesContainer.classList.add("hide");

  linha.remove();
  removerPacienteLocalStorage(paciente);

  nomePaciente.focus();
  [limparBtn, painel2].forEach((el) => el.classList.add("hide"))
}

  buttonEditar.addEventListener("click", () => {
    estagio = 1
    editarPaciente(paciente, tr);
  });

  tdActions.appendChild(buttonEditar);
  tdActions.appendChild(buttonRemover);

  tr.append(tdNome, tdIdade, tdGenero, tdSintoma, tdId, tdActions);

  if (tBody) tBody.appendChild(tr);
  else table.appendChild(tr);
  cardList.classList.remove("hide")
}

function MostrarLista() {
  const tBodyAll = tBody.querySelectorAll("tr")
  tBodyAll.forEach((el)=>{
    el.lastChild.classList.add("hide")
  })

  painel.classList.add("hide")
  
 const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

  if(pacientes.length === 0) {
  tokenSession.classList.remove("hide")
  painel.classList.add("hide")
  painel2.classList.add("hide");
  aviso.classList.remove("hide")
  aviso.textContent = "Sem pacientes cadastrados"
  containerAviso.classList.remove("green")
  aviso.classList.remove("green")

    setTimeout(()=>{
    aviso.classList.add("hide")
    },1000)
  }
}

olharLista.addEventListener("click", () =>{
  MostrarLista()
})

function mostrarErro(valor, texto, nomeCampo, tipo = "texto"){
 
  if(!valor){
    texto.classList.remove("hide")
    texto.textContent = `Preencha o campo ${nomeCampo}`
    return true
  }

  if(tipo === "idade"){
    const idade = Number(valor)

    if(Number.isNaN(idade) || idade < 0 || idade > 120){
      texto.classList.remove("hide")
      texto.textContent = "Idade inválida"
      return true
    }
  }

  return false
}

function validarCampos() {
  aviso.classList.add("hide")
  containerAviso.classList.remove("green")
  aviso.classList.remove("green")

  if(
    mostrarErro(nomePaciente.value.trim(), aviso, "nome") ||
    mostrarErro(idadePaciente.value.trim(), aviso, "idade", "idade") || 
    mostrarErro(generoSelect.value.trim(), aviso, "gênero") || 
    mostrarErro(sintomas.value.trim(), aviso, "sintomas")
  ){
    return false
  }

  return true
}

function validToken() {
  const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

  if (pacientes.length === 0) {
    painel2.classList.add("hide");
  } else {
    painel2.classList.remove("hide");
  }

  if (
    painel.classList.contains("hide") &&
    !tokenSession.classList.contains("hide") &&
    token.value === ""
  ) {
    aviso.classList.remove("hide");
    aviso.textContent = "Preencha o token";

    setTimeout(() => aviso.classList.add("hide"), 1000);
    return false;
  }

  if (token.value !== "Admin") {
    aviso.classList.remove("hide");
    aviso.textContent = "Token inválido";

    setTimeout(() => aviso.classList.add("hide"), 1000);
    return false;
  }

  // token válido
  aviso.classList.add("hide");
  tokenSession.classList.add("hide");
  painel.classList.remove("hide");

  return true;
}

cadastrarBtn.addEventListener("click", (e) => {
  e.preventDefault();
  
  if (validarCampos()) cadastrarPaciente();

  if(estagio === 2) cadastrarBtn.textContent = "Cadastrar"

});
  
function cadastrarPaciente() {
  resetBtn.classList.remove("hide")
  sideBar.classList.remove("hidden")
  painel2.classList.remove("hide")
  pacientesContainer.classList.remove("hide");

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

const limparBtn = document.querySelector("#reset-btn")

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

function criaButtonConfirmar(){
  const buttonConfirmar = document.createElement("button");
  buttonConfirmar.classList.add("CC-btn")
  buttonConfirmar.id = "confirmar-remocao-btn";
  buttonConfirmar.textContent = "Confirmar";
  return buttonConfirmar;
}

function criaButtonCancelar(){
  const buttonCancelar = document.createElement("button");
  buttonCancelar.classList.add("CC-btn")
  buttonCancelar.id = "cancelar-remocao-btn";
  buttonCancelar.textContent = "Cancelar";
  return buttonCancelar;
}

function confirmarRemocao(paciente, tr) {
  const container = document.createElement("div");
  container.id = "div-remocao";

  const box = document.createElement("div");
  box.id = "box-remocao"

  const h2 = document.createElement("h2");
  h2.id = "remocao-h2";
  h2.textContent = "Deseja mesmo remover paciente?";

  const btnConfirmar = criaButtonConfirmar();
  const btnCancelar = criaButtonCancelar();

  btnConfirmar.addEventListener("click", () => {
    tr.remove();
    removerPacienteLocalStorage(paciente);
    document.body.removeChild(container);
    // hide container if no rows left
    if (!tBody.querySelector("tr")) painel2.classList.add("hide") 
  });

  btnCancelar.addEventListener("click", () => {
    document.body.removeChild(container);
  });

  box.appendChild(h2);
  box.appendChild(btnCancelar);
  box.appendChild(btnConfirmar);
  container.appendChild(box);
  document.body.appendChild(container);
}

function controlarEnter(e) {
  if (e.key !== "Enter") return;

  e.preventDefault();

 
  if (!tokenSession.classList.contains("hide")) {
    confirmarToken();
    return;
  }


  if (!painel.classList.contains("hide")) {
    if (validarCampos()) {
      cadastrarPaciente();

      if (estagio === 2) {
        cadastrarBtn.textContent = "Cadastrar";
        estagio = 0;
      }
    }
  }
}
document.addEventListener("keydown", controlarEnter);

carregarPacientes()


