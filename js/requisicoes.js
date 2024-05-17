async function enviarDadosParaPlanilha(data) {
  const response = await fetch("api_adress/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  console.log(result.status);
}

async function requestDeLogin(data) {
  const response = await fetch("api_adress/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (response.status === 200) {
    // Salva o token no localStorage
    localStorage.setItem("token", result.token);

    // Redireciona para a nova página
    window.location.href = "./dashboard.html";
  }

  return result.status;
}
