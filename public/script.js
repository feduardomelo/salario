function onOff() {

    document
        .querySelector("#modal")
        .classList
        .toggle("hide")

}

function checkFields(event) {
    const valuesToCheck = [
        "profissao",
        "category",
        "description",
        "salario"
    ]

    const isEmpty = valuesToCheck.find(function(value){
        const checkIfIsString = typeof event.target[value].value === "string"
        const checkIfIsEmpty = !event.target[value].value.trim()

        if(checkIfIsString && checkIfIsEmpty) {
            return true
        }
    })

    if(isEmpty) {
        event.preventDefault()
        alert("Por favor, preencha todos os campos.")
    }
}