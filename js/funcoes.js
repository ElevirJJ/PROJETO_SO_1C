var dateInput = document.getElementById("data_nascimento");
var cpfInput = document.getElementById("cpf");
var nomeInput = document.getElementById("nome");
var phoneInput = document.getElementById("whatsapp");
var emailInput = document.getElementById("email");
var senhaInput = document.getElementById("senha");
var senhaRInput = document.getElementById("senha_repetida");


var enterKeydownListener = function (event) {
    if (event.key === "Enter") {
      const currentElement = document.activeElement;
      const formElements = Array.from(document.querySelectorAll("#formulario input, #formulario button"));
      const currentIndex = formElements.indexOf(currentElement);
      if (currentIndex !== -1) {
        if (currentIndex < formElements.length - 2) {
          formElements[currentIndex + 1].focus();
        } else {
          const submitButton = document.getElementById("botao_cadastrar");
          if (submitButton) {
            submitButton.click();
          }
        }
      }
    }
  };


document.addEventListener("keydown", enterKeydownListener);


nomeInput.addEventListener("input", function (event) {
  let inputValue = nomeInput.value;

  inputValue = inputValue.replace(/[^a-zA-Z\s]/g, "");

  if (inputValue.length > 1) {
    nomeInput.classList.remove("input_invalido");
    document.getElementById("msg_erro_nome").style.display = "none";
  }

  nomeInput.value = inputValue;
});

dateInput.addEventListener("input", function (event) {
  let inputValue = dateInput.value;

  // Remove todos os caracteres não numéricos
  inputValue = inputValue.replace(/\D/g, "");

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

  if (inputValue.length == 10) {
    dateInput.classList.remove("input_invalido");
    document.getElementById("msg_erro_data").style.display = "none";
  }
});

cpfInput.addEventListener("input", function (event) {
  let inputValue = cpfInput.value;

  // Remove todos os caracteres não numéricos
  inputValue = inputValue.replace(/\D/g, "");

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

  if (inputValue.length == 14) {
    if (validar_cpf(cpfInput.value)) {
      cpfInput.classList.remove("input_invalido");
      document.getElementById("msg_erro_cpf").style.display = "none";
    }
  }
});

phoneInput.addEventListener("input", function (event) {
  let inputValue = phoneInput.value;

  // Remove todos os caracteres não numéricos
  inputValue = inputValue.replace(/\D/g, "");

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

  if (inputValue.length == 15) {
    phoneInput.classList.remove("input_invalido");
    document.getElementById("msg_erro_phone").style.display = "none";
  }
});

emailInput.addEventListener("input", function (event) {
  let inputValue = emailInput.value;

  if (validar_email(inputValue)) {
    emailInput.classList.remove("input_invalido");
    document.getElementById("msg_erro_email").style.display = "none";
  }
});

senhaInput.addEventListener("input", function (event) {
  let inputValue = senhaInput.value;

  if (inputValue.length > 5) {
    senhaInput.classList.remove("input_invalido");
    document.getElementById("msg_erro_senha").style.display = "none";
  }
});

function validar_cpf(cpf) {
  cpf = cpf.replace(/[^\d]/g, ""); // Remove caracteres não numéricos

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false; // CPF deve ter 11 dígitos e não pode ser composto por um único dígito repetido
  }

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cpf.substring(9, 10))) {
    return false; // Primeiro dígito verificador inválido
  }

  soma = 0;

  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cpf.substring(10, 11))) {
    return false; // Segundo dígito verificador inválido
  }

  return true; // CPF válido
}

function validar_email(email) {
  if (email.length < 5) return false;
  else {
    let count_at = 0;
    for (i = 0; i < email.length; i++) {
      if (email[i] == "@") count_at++;
    }

    if (count_at == 1) return true;
    else return false;
  }
}

function validar_senha(senha_repetida) {
  if (senhaInput.classList.contains("input_invalido")) return true;
  else {
    if (senha_repetida == senhaInput.value) return true;
    else return false;
  }
}

function validar_campos() {
  let flag = true;

  // nome

  if (!nomeInput.value) {
    nomeInput.classList.add("input_invalido");
    document.getElementById("msg_erro_nome").innerHTML = "Campo vazio";
    document.getElementById("msg_erro_nome").style.display = "block";
    flag = false;
  }

  // data

  if (dateInput.value.length < 10) {
    dateInput.classList.add("input_invalido");
    document.getElementById("msg_erro_data").innerHTML = "Data inválida";
    document.getElementById("msg_erro_data").style.display = "block";
    flag = false;
  }

  // cpf

  if (cpfInput.value.length < 14) {
    cpfInput.classList.add("input_invalido");
    document.getElementById("msg_erro_cpf").innerHTML = "CPF inválido";
    document.getElementById("msg_erro_cpf").style.display = "block";
    flag = false;
  }

  // telefone

  if (phoneInput.value.length < 15) {
    phoneInput.classList.add("input_invalido");
    document.getElementById("msg_erro_phone").innerHTML = "Número inválido";
    document.getElementById("msg_erro_phone").style.display = "block";
    flag = false;
  }

  // email

  if (!validar_email(emailInput.value)) {
    emailInput.classList.add("input_invalido");
    document.getElementById("msg_erro_email").innerHTML = "Email inválido";
    document.getElementById("msg_erro_email").style.display = "block";
    flag = false;
  }

  // senha 1

  if (senhaInput.value.length < 6) {
    senhaInput.classList.add("input_invalido");
    document.getElementById("msg_erro_senha").innerHTML = "Mínimo de 6 caracteres";
    document.getElementById("msg_erro_senha").style.display = "block";
    flag = false;
  }

  // senha 2

  if (!validar_senha(senhaRInput.value)) {
    senhaRInput.classList.add("input_invalido");
    document.getElementById("msg_erro_senhaR").innerHTML = "Senhas não correspondem";
    document.getElementById("msg_erro_senhaR").style.display = "block";
    flag = false;
  } else {
    senhaRInput.classList.remove("input_invalido");
    document.getElementById("msg_erro_senhaR").style.display = "none";
  }

  // cpf

  if (!validar_cpf(cpfInput.value)) {
    cpfInput.classList.add("input_invalido");
    document.getElementById("msg_erro_cpf").innerHTML = "CPF inválido";
    document.getElementById("msg_erro_cpf").style.display = "block";
    flag = false;
  }

  return flag;
}

function cadastrar() {
    if (validar_campos()) {
      enviar_cadastro();
      document.getElementsByClassName("caixa_dados")[0].style.display = "none";
      document.getElementsByClassName("caixa_confirmacao")[0].style.display = "block";
      document.removeEventListener("keydown", enterKeydownListener);
      document.addEventListener("keydown", function(event) {
        if (event.key === "Enter" && document.getElementsByClassName("caixa_confirmacao")[0].style.display === "block") {
          var button = document.getElementById("botao_voltar_para_tela_login");
          button.click();
        }
      });
    }
  }

function voltar_para_tela_login() {
  window.location.href = "./index.html";
}

async function enviar_cadastro(){
    dados = {
        nome: nomeInput.value,
        dataNascimento: dateInput.value,
        cpf: cpfInput.value,
        telefone: phoneInput.value,
        email: emailInput.value,
        senha: senhaInput.value
    };

    enviarDadosParaPlanilha(dados);
}


function cadastrar_pet(){
  alert("Em desenvolvimento");
}