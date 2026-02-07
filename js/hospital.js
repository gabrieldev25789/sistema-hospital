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

// EVENTO DO DASHBOARD
dashboard.addEventListener("click", () =>{
  [aviso, painel, painel2].forEach((el)=> el.classList.add("hide"))

  tokenSession.classList.remove("hide")
})

// Se cardList existir, oculta o painel, o painel2 e a lista de cards
if(cardList)[painel, painel2, cardList].forEach((el) => el.classList.add("hide"))

// Evitar numeros no nome 
nomePaciente.addEventListener("input", () => {
  nomePaciente.value = nomePaciente.value.replace(/\d/g, "")
});

// FUNÇÃO DE CONFIRMAR TOKEN 
function confirmarToken() {
  containerAviso.classList.remove("hide")
  aviso.classList.remove("hide")
  const tokenValue = token.value.trim()

  const mostrarAviso = (mensagem, verde = false) => {
    aviso.textContent = mensagem
    aviso.classList.toggle("green", verde)
    containerAviso.classList.toggle("green", verde)
    aviso.classList.remove("hide")

    setTimeout(() => {
      aviso.classList.add("hide")
    }, 1000)
  }

  if (!tokenValue) {
    mostrarAviso("Preencha o token")
    return
  }

  if (tokenValue !== "Admin") {
    mostrarAviso("Token inválido")
    token.value = ""
    return
  }

// MOSTRAR AVISO CASO O TOKEN ESTEJA CERTO 
  mostrarAviso("Acesso permitido", true)
  tokenSession.classList.add("hide")
  painel.classList.remove("hide")

  const pacientes = JSON.parse(localStorage.getItem("pacientes")) || []
  painel2.classList.toggle("hide", pacientes.length === 0)

  token.value = ""

  if (cardList.classList.contains("hide")) {
    painel2.classList.add("hide")
  }

  tBody.querySelectorAll("tr").forEach(tr => {
    tr.lastChild.classList.remove("hide")
  })
}

// EVENTO DE CONFIRMAR TOKEN 
tokenButton.addEventListener("click", () =>{
  confirmarToken()
})

const pacientesSalvos = JSON.parse(localStorage.getItem("pacientes")) || [];

// FUNÇÃO DE CARREGAR PACIENTES 
function carregarPacientes() {
  pacientesSalvos.forEach((paciente) => {
    adicionarPacienteNaTabela(paciente);
  });
  if (pacientesSalvos.length > 0) {
    pacientesContainer.classList.remove("hide");
  }
}

// CRIA BUTTON DE EDITAR 
function criaButtonEditar() {
  const buttonEditar = document.createElement("button");
  buttonEditar.classList.add("btn");
  buttonEditar.id = "btn-edit"
  buttonEditar.textContent = "Editar";
  return buttonEditar;
}

// CRIA TD 
function criarTd(text = "") {
  const td = document.createElement("td");
  td.textContent = text;
  return td;
}

// CRIA TR 
function criaTr(){
  const tr = document.createElement("tr");
  return tr;
}

// VARIAVEL PARA ALTERAR O TEXTO DO BTN DE CADASTRAR  
let estagio

// ADICIONAR PACIENTE NA TABELA 
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

// EDITAR PACIENTE  
function editarPaciente(paciente, linha) {  
  aviso.textContent = "Pciente editado"
  sideBar.classList.add("hidden")
  /* EDITAR BUGANDO */ 
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

// EVENTO DE EDITAR PACIENTE 
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

// MOSTRAR LISTA DE PACIENTES CADASTRADOS
function MostrarLista() {
  limparCampos()
  const tBodyAll = tBody.querySelectorAll("tr")
  tBodyAll.forEach((el)=>{
    el.lastChild.classList.add("hide")
})

painel.classList.add("hide")
  
const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

if(pacientes.length === 0) {

  tokenSession.classList.remove("hide")

  if (painel) painel.classList.add("hide")
  if (painel2) painel2.classList.add("hide")

  aviso.classList.remove("hide", "green")
  aviso.textContent = "Sem pacientes cadastrados"

  containerAviso.classList.remove("green")

  setTimeout(()=>{aviso.classList.add("hide")},1000)

  } else{
      tokenSession.classList.add("hide")
      painel2.classList.remove("hide")
  }

  return true 
}

// EVENTO DE OLHAR LISTA 
olharLista.addEventListener("click", () =>{
  MostrarLista()
})

// MOSTRAR ERRO CASO O USUARIO NÃO PREENCHA OS CAMPOS OU ALGUM CAMPO ESTEJA INVALIDO 
function mostrarErro(valor, texto, nomeCampo, tipo = "texto"){


  if(!valor){
    texto.classList.remove("hide")
    texto.textContent = `Preencha o campo ${nomeCampo}`
    containerAviso.classList.remove("green")
    aviso.classList.remove("green")
    setTimeout(()=>{texto.classList.add("hide")}, 1000)

    return true
  }

  if(tipo === "idade"){
    const idade = Number(valor)

    if(Number.isNaN(idade) || idade <= 0 || idade > 120){
      texto.classList.remove("hide")
      texto.textContent = "Idade inválida"
      setTimeout(()=>{texto.classList.add("hide")}, 1000)
      return true
    }
  }

  return false
}

// VALIDAR CAMPOS 
function validarCampos() {


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

// VALIDAR TOKEN 
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

function pacienteCadastrado(){
  containerAviso.classList.add("green")
  aviso.classList.remove("hide")
  aviso.classList.add("green")
  aviso.textContent = "Paciente cadastrado"
    setTimeout(()=>{
    containerAviso.classList.add("hide")
    aviso.classList.remove("green")
  },1000)
}

// EVENTO DE CADASTRAR USUARIO 
cadastrarBtn.addEventListener("click", (e) => {
  e.preventDefault();
  containerAviso.classList.remove("hide")
  aviso.classList.remove("hide")
  
  if (validarCampos()) cadastrarPaciente();

  if(estagio === 2) cadastrarBtn.textContent = "Cadastrar"

});
  
// CADASTRAR PACIENTE
function cadastrarPaciente(){
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

  pacienteCadastrado()
}

const limparBtn = document.querySelector("#reset-btn")

// SALVAR PACIENTES NA LOCAL STORAGE 
function salvarPacienteLocalStorage(paciente) {
  const pacientesSalvos = JSON.parse(localStorage.getItem("pacientes")) || [];
  pacientesSalvos.push(paciente);
  localStorage.setItem("pacientes", JSON.stringify(pacientesSalvos));
}

// REMOVER PACIENTES DA LOCAL STORAGE 
function removerPacienteLocalStorage(pacienteRemovido) {
  const pacientesSalvos = JSON.parse(localStorage.getItem("pacientes")) || [];

  const novosPacientes = pacientesSalvos.filter((p) => p.id !== pacienteRemovido.id);
  localStorage.setItem("pacientes", JSON.stringify(novosPacientes));
}

// LIMPAR CAMPOS 
function limparCampos() {
  [nomePaciente, idadePaciente, generoSelect, sintomas].forEach((el)=> el.value = "")
}

// CRIA BTN DE CONFIRMAR REMOÇÃO
function criaButtonConfirmar(){
  const buttonConfirmar = document.createElement("button");
  buttonConfirmar.classList.add("CC-btn")
  buttonConfirmar.id = "confirmar-remocao-btn";
  buttonConfirmar.textContent = "Confirmar";
  return buttonConfirmar;
}

// CRIA BTN DE CANCELAR REMOÇÃO 
function criaButtonCancelar(){
  const buttonCancelar = document.createElement("button");
  buttonCancelar.classList.add("CC-btn")
  buttonCancelar.id = "cancelar-remocao-btn";
  buttonCancelar.textContent = "Cancelar";
  return buttonCancelar;
}

  const container = document.createElement("div");
  container.id = "div-remocao";

// CONFIRMAR REMOÇÃO DE PACIENTE 

function confirmarRemocao(paciente, tr) {

  // 🔒 impede múltiplos modais
  if (document.querySelector("#div-remocao")) return;

  const container = document.createElement("div");
  container.id = "div-remocao";

  const box = document.createElement("div");
  box.id = "box-remocao";

  const h2 = document.createElement("h2");
  h2.id = "remocao-h2";
  h2.textContent = "Deseja mesmo remover paciente?";

  const btnConfirmar = criaButtonConfirmar();
  const btnCancelar = criaButtonCancelar();

  btnConfirmar.addEventListener("click", () => {
    aviso.classList.add("hide")
    containerAviso.classList.remove("green", "hide")
    aviso.classList.remove("green")
    tr.remove();
    removerPacienteLocalStorage(paciente);
    container.remove();

    if (!tBody.querySelector("tr")) {
      painel2.classList.add("hide");
    }
  });

  btnCancelar.addEventListener("click", () => {
    container.remove();
  });

  box.append(h2, btnCancelar, btnConfirmar);
  container.appendChild(box);
  document.body.appendChild(container);
}


let temContainer = false  

// CONTROLA A FUNÇÃO DO ENTER DEPENDENDO DO QUE ESTÁ NA TELA  
function controlarEnter(e) {
  if (e.key !== "Enter") return;

  const modalRemocaoAberto = document.querySelector("#div-remocao");

  if (modalRemocaoAberto && !modalRemocaoAberto.classList.contains("hide")) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return;
  }

  e.preventDefault();

  containerAviso.classList.remove("hide");
  aviso.classList.remove("hide");

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

document.addEventListener("keydown", controlarEnter, true);

// INICIO 
carregarPacientes()


