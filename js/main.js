/* ============================================================
Funções compartilhadas por todas as páginas públicas.
============================================================ */

/* ---------- Formulário de contato ---------- */

const formContato = document.getElementById("form-contato");

if (formContato) {

  formContato.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    const feedback = document.getElementById("feedback-contato");
    const botao = formContato.querySelector("button[type='submit']");

    // Validação
    if (nome.length < 3) {
      feedback.textContent = "Informe seu nome completo.";
      feedback.className = "msg-feedback erro";
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      feedback.textContent = "Informe um e-mail válido.";
      feedback.className = "msg-feedback erro";
      return;
    }

    if (mensagem.length < 10) {
      feedback.textContent = "Escreva uma mensagem com pelo menos 10 caracteres.";
      feedback.className = "msg-feedback erro";
      return;
    }

    botao.disabled = true;
    botao.textContent = "Enviando...";

    try {

      await fetch(
        "https://script.google.com/macros/s/AKfycbx-QBlUAXyAQIgHaEunXMM-hVmPHVRUYp7V97eLZTm_ygTqFjcPHW0NVQqytzZT5LsMVA/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify({
            nome,
            email,
            mensagem
          })
        }
      );

      feedback.textContent =
        "Mensagem enviada com sucesso! Obrigado pelo contato.";

      feedback.className = "msg-feedback sucesso";

      formContato.reset();

    } catch (erro) {

      console.error("Erro ao enviar mensagem:", erro);

      feedback.textContent =
        "Não foi possível enviar sua mensagem. Tente novamente mais tarde.";

      feedback.className = "msg-feedback erro";

    } finally {

      botao.disabled = false;
      botao.textContent = "Enviar mensagem";

    }

  });

}