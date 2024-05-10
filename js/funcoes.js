var dateInput = document.getElementById('data_nascimento');
var cpfInput = document.getElementById('cpf');
var nomeInput = document.getElementById('nome');
var phoneInput = document.getElementById('whatsapp');
var emailInput = document.getElementById('email')
var senhaInput = document.getElementById('senha')
var senhaRInput = document.getElementById('senha_repetida')

dateInput.addEventListener('input', function (event) {
    let inputValue = dateInput.value;

    // Remove todos os caracteres não numéricos
    inputValue = inputValue.replace(/\D/g, '');

    // Adiciona as barras nas posições corretas
    if (inputValue.length > 2 && inputValue.length <= 4) {
        inputValue = `${inputValue.slice(0, 2)}/${inputValue.slice(2)}`;
    } else if (inputValue.length > 4 && inputValue.length <= 6) {
        inputValue = `${inputValue.slice(0, 2)}/${inputValue.slice(2, 4)}/${inputValue.slice(4)}`;
    } else if (inputValue.length > 6) {
        inputValue = `${inputValue.slice(0, 2)}/${inputValue.slice(2, 4)}/${inputValue.slice(4, 8)}`;
    }

    // Limita o tamanho da string a 10 caracteres
    inputValue = inputValue.slice(0, 10);

    // Atualiza o valor do campo de entrada
    dateInput.value = inputValue;

    });

cpfInput.addEventListener('input', function (event) {
    let inputValue = cpfInput.value;

    // Remove todos os caracteres não numéricos
    inputValue = inputValue.replace(/\D/g, '');

    // Adiciona os pontos e o traço nas posições corretas
    if (inputValue.length > 3 && inputValue.length <= 6) {
        inputValue = `${inputValue.slice(0, 3)}.${inputValue.slice(3)}`;
    } else if (inputValue.length > 6 && inputValue.length <= 9) {
        inputValue = `${inputValue.slice(0, 3)}.${inputValue.slice(3, 6)}.${inputValue.slice(6)}`;
    } else if (inputValue.length > 9 && inputValue.length <= 11) {
        inputValue = `${inputValue.slice(0, 3)}.${inputValue.slice(3, 6)}.${inputValue.slice(6, 9)}-${inputValue.slice(9)}`;
    }

    // Limita o tamanho da string a 14 caracteres
    inputValue = inputValue.slice(0, 14);

    // Atualiza o valor do campo de entrada
    cpfInput.value = inputValue;
});

phoneInput.addEventListener('input', function (event) {
    let inputValue = phoneInput.value;

    // Remove todos os caracteres não numéricos
    inputValue = inputValue.replace(/\D/g, '');

    // Adiciona os parênteses, espaço e traço nas posições corretas
    if (inputValue.length > 2 && inputValue.length <= 7) {
        inputValue = `(${inputValue.slice(0, 2)}) ${inputValue.slice(2)}`;
    } else if (inputValue.length > 7 && inputValue.length <= 11) {
        inputValue = `(${inputValue.slice(0, 2)}) ${inputValue.slice(2, 7)}-${inputValue.slice(7)}`;
    }

    // Limita o tamanho da string a 15 caracteres
    inputValue = inputValue.slice(0, 15);

    // Atualiza o valor do campo de entrada
    phoneInput.value = inputValue;
});

function teste() {
    alert("função em desenvolvimento")
    /*
    if(!nomeInput.value){
        nomeInput.style.borderColor = "red";
        nomeInput.style.borderWidth = "2px";
    }

    if (!dateInput.value) {
        dateInput.style.borderColor = "red";
        dateInput.style.borderWidth = "2px";
    }

    if (!cpfInput.value){
        cpfInput.style.borderColor = "red";
        cpfInput.style.borderWidth = "2px"; 
    }

    if (!phoneInput.value){
        phoneInput.style.borderColor = "red";
        phoneInput.style.borderWidth = "2px";
    }

    if (!emailInput.value){
        emailInput.style.borderColor = "red";
        emailInput.style.borderWidth = "2px";
    }

    if(!senhaInput.value){
        senhaInput.style.borderColor = "red";
        senhaInput.style.borderWidth = "2px";
    }

    if(!senhaRInput.value){
        senhaRInput.style.borderColor = "red";
        senhaRInput.style.borderWidth = "2px";
    }*/
}