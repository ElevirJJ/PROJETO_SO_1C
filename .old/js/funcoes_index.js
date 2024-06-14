var msg_erro = document.getElementById("msg_erro_login");

var enterKeydownListener = function (event) {
  if (event.key === "Enter") {
    const currentElement = document.activeElement;
    const formElements = Array.from(document.querySelectorAll("#email, #senha"));
    const currentIndex = formElements.indexOf(currentElement);
    if (currentIndex !== -1) {
      if (currentIndex < formElements.length - 1) {
        formElements[currentIndex + 1].focus();
      } else {
        const submitButton = document.getElementById("botao_login");
        if (submitButton) {
          submitButton.click();
        }
      }
    }
  }
};

document.addEventListener("keydown", enterKeydownListener);

async function fazerLogin() {
  esconder_erro();

  emailInput = document.getElementById("email");
  senhaInput = document.getElementById("senha");

  if (emailInput.value.length < 5) {
    mostrar_erro();
  } else {
    let count_at = 0;
    for (i = 0; i < emailInput.value.length; i++) {
      if (emailInput.value[i] == "@") count_at++;
    }
    if (count_at != 1) {
      mostrar_erro();
    } else {
      dados_login = {
        email: emailInput.value,
        senha: senhaInput.value,
      };

      const resposta = await requestDeLogin(dados_login);
      console.log("Resposta: " + resposta);
      if (resposta == "failure") {
        mostrar_erro();
        emailInput.value = "";
        senhaInput.value = "";
      }
      else{
        emailInput.value = "";
        senhaInput.value = "";
      }
    }
  }
}

function mostrar_erro() {
  msg_erro.innerHTML = "E-mail e/ou senha incorretos";
  msg_erro.style.display = "block";
}

function esconder_erro() {
  msg_erro.style.display = "none";
}
