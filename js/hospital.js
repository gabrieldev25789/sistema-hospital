const cadastrarBtn = document.querySelector(".cadastrar-btn")
const nomePaciente = document.querySelector("#name")
const idadePaciente = document.querySelector("#age")

const generoSelect = document.querySelector("#gender")

const sintomas = document.querySelector("#symptoms")

const table = document.querySelector(".table")

const pacientesContainer = document.querySelector(".table")

generoSelect.addEventListener("change", () =>{

    if(generoSelect.value === "M"){
        console.log("Masculino")
    } else{
        console.log("Feminino")
    }
})

const buttonRemover = document.createElement("button")
buttonRemover.classList.add("btn-remove")
buttonRemover.textContent = "X"

function cadastrarPaciente(){
    cadastrarBtn.addEventListener("click", (e) =>{
    pacientesContainer.classList.remove("hide")
    e.preventDefault()
    
    const tbody = document.createElement("tbody")

    const tr = document.createElement("tr")

    const tdNome = document.createElement("td")
    const tdIdade = document.createElement("td")
    const tdGenero = document.createElement("td")
    const tdSintoma = document.createElement("td")

    const buttonEditar = document.createElement("button")
    buttonEditar.classList.add("btn-edit")
    buttonEditar.textContent = "Editar"

    tdNome.textContent = nomePaciente.value 
    tdIdade.textContent = idadePaciente.value 
    tdGenero.textContent = generoSelect.value 
    tdSintoma.textContent = sintomas.value 

    tr.appendChild(tdNome)
    tr.appendChild(tdIdade)
    tr.appendChild(tdGenero)
    tr.appendChild(tdSintoma)
    tr.appendChild(buttonEditar)
    tr.appendChild(buttonRemover)

    table.appendChild(tr)

    console.log(nomePaciente.value)
    console.log(idadePaciente.value)
    console.log(generoSelect.value)
    console.log(sintomas.value)

    buttonRemover.addEventListener("click", (e) =>{
    [tdNome, tdIdade, tdGenero, tdSintoma, buttonEditar, buttonRemover].forEach((el)=> 
    el.remove())
    })
    LimparCampos()
})
}
cadastrarPaciente()

function LimparCampos(){
    nomePaciente.value = ""
    idadePaciente.value = ""
    generoSelect.value = ""
    sintomas.value = ""
}
