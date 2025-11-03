const cadastrarBtn = document.querySelector(".cadastrar-btn")
const nomePaciente = document.querySelector("#name")
const idadePaciente = document.querySelector("#age")

const generoSelect = document.querySelector("#gender")

const sintomas = document.querySelector("#symptoms")

generoSelect.addEventListener("change", () =>{

    if(generoSelect.value === "M"){
        console.log("Masculino")
    } else{
        console.log("Feminino")
    }
})

function cadastrarPaciente(){
    cadastrarBtn.addEventListener("click", (e) =>{
    e.preventDefault()
    
    console.log(nomePaciente.value)
    console.log(idadePaciente.value)
    console.log(generoSelect.value)
    console.log(sintomas.value)
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
