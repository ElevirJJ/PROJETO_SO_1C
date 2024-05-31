document.addEventListener("DOMContentLoaded", function () {
	var form = document.getElementById("formulario");
	if (form) {
		form.setAttribute("novalidate", true);
	}
	var nomeDoTutorInput = document.getElementById("id_nome_do_tutor");
	var dateInput = document.getElementById("id_data_nascimento");
	var phoneInput = document.getElementById("id_whatsapp");
	var emailInput = document.getElementById("id_email");
	var nomeDoAnimalInput = document.getElementById("id_nome_do_animal");
	var tipoDeAnimalInput = document.getElementById("id_tipo_de_animal");
	var idadeDoAnimalInput = document.getElementById("id_idade_do_animal");
	var pesoDoAnimalInput = document.getElementById("id_peso_do_animal");
	/*
	flatpickr("input[type=datetime-local]", {
		enableTime: true,
		minDate: "today",
		maxDate: new Date().fp_incr(30), // 7 dias a partir de hoje
		time_24hr: true,
		dateFormat: "Y-m-dTH:i:S",
		altInput: true,
		altFormat: "l, d/m/y - H\\h",
		minDate: "today",
		minuteIncrement: 60,
		disableMobile: "true",
		// Desabilitar datas específicas
		disable: [
			{ from: "2024-06-05T00:00:00", to: "2024-06-10T23:59:59" },
			{ from: "2024-06-15T00:00:00", to: "2024-06-20T23:59:59" },
		],
	});*/

	var enterKeydownListener = function (event) {
		if (event.key === "Enter") {
			event.preventDefault();
			const currentElement = document.activeElement;
			const formElements = Array.from(document.querySelectorAll("#formulario input, #formulario textarea"));
			const currentIndex = formElements.indexOf(currentElement);
			if (currentIndex !== -1) {
				if (currentIndex < formElements.length - 2) {
					formElements[currentIndex + 1].focus();
				} else {
					const submitButton = document.querySelector(".botao_cadastrar");
					if (submitButton) {
						submitButton.click();
					}
				}
			}
		}
	};

	document.addEventListener("keydown", enterKeydownListener);

	// Iterar sobre todos os campos do formulário
	document.querySelectorAll(".form-group").forEach(function (element) {
		// Verificar se o campo tem erros
		if (element.querySelector(".error")) {
			// Adicionar a classe de erro ao campo
			if (element.querySelector("input")) {
				element.querySelector("input").classList.add("input_invalido");
			} else {
				element.querySelector("select").classList.add("input_invalido");
			}
		}
	});

	$("#id_nome_do_tutor").on("input", function () {
		var errorMessage = $(this).attr("data-error-msg");
		var inputValue = $(this).val();
		// Lógica para validar o valor do campo e exibir/ocultar a mensagem de erro
		if (inputValue.length > 1) {
			$(this).removeClass("input_invalido");
			$(this).next(".error").text("").hide(); // ou $(this).next('.error').hide();
		}
	});

	$("#id_data_nascimento").on("input", function () {
		var inputValue = $(this).val();
		inputValue = inputValue.replace(/\D/g, "");
		if (inputValue.length > 2 && inputValue.length <= 4) {
			inputValue = `${inputValue.slice(0, 2)}/${inputValue.slice(2)}`;
		} else if (inputValue.length > 4 && inputValue.length <= 6) {
			inputValue = `${inputValue.slice(0, 2)}/${inputValue.slice(2, 4)}/${inputValue.slice(4)}`;
		} else if (inputValue.length > 6) {
			inputValue = `${inputValue.slice(0, 2)}/${inputValue.slice(2, 4)}/${inputValue.slice(4, 8)}`;
		}
		inputValue = inputValue.slice(0, 10);
		$(this).val(inputValue);
		if (inputValue.length == 10) {
			$(this).removeClass("input_invalido");
			$(this).next(".error").text("").hide();
		}
	});

	$("#id_whatsapp").on("input", function () {
		var inputValue = $(this).val();
		inputValue = inputValue.replace(/\D/g, "");
		if (inputValue.length > 2 && inputValue.length <= 7) {
			inputValue = `(${inputValue.slice(0, 2)}) ${inputValue.slice(2)}`;
		} else if (inputValue.length > 7 && inputValue.length <= 11) {
			inputValue = `(${inputValue.slice(0, 2)}) ${inputValue.slice(2, 7)}-${inputValue.slice(7)}`;
		}
		inputValue = inputValue.slice(0, 15);
		$(this).val(inputValue);
		if (inputValue.length == 15) {
			$(this).removeClass("input_invalido");
			$(this).next(".error").text("").hide();
		}
	});

	$("#id_email").on("input", function () {
		var inputValue = $(this).val();
		if (validar_email(inputValue)) {
			$(this).removeClass("input_invalido");
			$(this).next(".error").text("").hide();
		}
	});

	function validar_email(email) {
		if (email.length < 3) return false;
		else {
			var count_at = 0;
			for (var i = 0; i < email.length; i++) {
				if (email[i] == "@") count_at++;
			}
			if (count_at == 1) return true;
			else return false;
		}
	}

	$("#id_nome_do_animal").on("input", function () {
		var inputValue = $(this).val();
		inputValue = inputValue.replace(/[^a-zA-Z\s]/g, "");
		if (inputValue.length > 1) {
			$(this).removeClass("input_invalido");
			$(this).next(".error").text("").hide();
		}
		$(this).val(inputValue);
	});

	$("#id_tipo_de_animal").on("input", function () {
		var inputValue = $(this).val();
		if (inputValue !== "Selecione") {
			$(this).removeClass("input_invalido");
			$(this).next(".error").text("").hide();
		}
	});

	$("#id_idade_do_animal, #id_peso_do_animal").on("input", function () {
		var inputValue = $(this).val();
		if (validar_numero(inputValue)) {
			$(this).removeClass("input_invalido");
			$(this).next(".error").text("").hide();
		}
		$(this).val(inputValue);
	});

	function validar_numero(entrada) {
		if (entrada.length < 3) return false;
		else {
			if (/\d/.test(entrada)) {
				return true;
			} else {
				return false;
			}
		}
	}

	document.getElementById("confirmacao").addEventListener("change", function () {
		var botao = document.querySelector(".botao_cadastrar");
		botao.disabled = !this.checked;
	});

	/*function validar_campos() {
        let flag = true;
        if (!nomeDoTutorInput.value) {
            nomeDoTutorInput.classList.add("input_invalido");
            document.getElementById("msg_erro_nome").innerHTML = "Campo vazio";
            document.getElementById("msg_erro_nome").style.display = "block";
            flag = false;
        }
        if (dateInput.value.length < 10) {
            dateInput.classList.add("input_invalido");
            document.getElementById("msg_erro_data").innerHTML = "Data inválida";
            document.getElementById("msg_erro_data").style.display = "block";
            flag = false;
        }
        if (phoneInput.value.length < 15) {
            phoneInput.classList.add("input_invalido");
            document.getElementById("msg_erro_phone").innerHTML = "Número inválido";
            document.getElementById("msg_erro_phone").style.display = "block";
            flag = false;
        }
        if (!validar_email(emailInput.value)) {
            emailInput.classList.add("input_invalido");
            document.getElementById("msg_erro_email").innerHTML = "Email inválido";
            document.getElementById("msg_erro_email").style.display = "block";
            flag = false;
        }
        if (!nomeDoAnimalInput.value) {
            nomeDoAnimalInput.classList.add("input_invalido");
            document.getElementById("msg_erro_animal").innerHTML = "Campo vazio";
            document.getElementById("msg_erro_animal").style.display = "block";
            flag = false;
        }
        if (tipoDeAnimalInput.value === "Selecione") {
            tipoDeAnimalInput.classList.add("input_invalido");
            document.getElementById("msg_erro_tipo_de_animal").innerHTML = "Tipo de animal não selecionado";
            document.getElementById("msg_erro_tipo_de_animal").style.display = "block";
            flag = false;
        }
        if (!validar_numero(idadeDoAnimalInput.value)) {
            idadeDoAnimalInput.classList.add("input_invalido");
            document.getElementById("msg_erro_idade_do_animal").innerHTML = "Valor inválido";
            document.getElementById("msg_erro_idade_do_animal").style.display = "block";
            flag = false;
        }
        if (!validar_numero(pesoDoAnimalInput.value)) {
            pesoDoAnimalInput.classList.add("input_invalido");
            document.getElementById("msg_erro_peso_do_animal").innerHTML = "Valor inválido";
            document.getElementById("msg_erro_peso_do_animal").style.display = "block";
            flag = false;
        }
        return flag;
    }

    function cadastrar() {
        if (validar_campos()) {
            // enviar_cadastro();
            document.getElementsByClassName("caixa_dados")[0].style.display = "none";
            document.getElementsByClassName("caixa_confirmacao")[0].style.display = "block";
            document.removeEventListener("keydown", enterKeydownListener);
            document.addEventListener("keydown", function(event) {
                if (event.key === "Enter" && document.getElementsByClassName("caixa_confirmacao")[0].style.display === "block") {
                    var button = document.getElementById("botao_voltar_para_tela_agendamento");
                    button.click();
                }
            });
        }
    }

    async function enviar_cadastro() {
        const dados = {
            nome: nomeDoTutorInput.value,
            dataNascimento: dateInput.value,
            telefone: phoneInput.value,
            email: emailInput.value,
            nomeDoAnimal: nomeDoAnimalInput.value,
            tipoDeAnimal: tipoDeAnimalInput.value,
            idadeDoAnimal: idadeDoAnimalInput.value,
            pesoDoAnimal: pesoDoAnimalInput.value,
            observacoes: textarea.value
        };

        await enviarDadosParaPlanilha(dados);
    }*/
});
