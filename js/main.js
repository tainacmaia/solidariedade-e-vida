/* ============================================================
  Funções compartilhadas por todas as páginas públicas.
   ============================================================ */

/* ---------- Notícias e eventos ---------- */

const NOTICIAS_PADRAO = [
  {
    data: "15/06/2026",
    titulo: "Campanha do Agasalho 2026",
    texto: "Estamos arrecadando roupas de frio e cobertores para as famílias assistidas. Doações podem ser entregues na sede do grupo até o fim de julho."
  },
  {
    data: "02/05/2026",
    titulo: "Roda de conversa sobre adesão ao tratamento",
    texto: "Encontro mensal com profissionais de saúde voluntários para tirar dúvidas sobre o tratamento antirretroviral, em ambiente acolhedor e sigiloso."
  },
  {
    data: "10/04/2026",
    titulo: "Bazar solidário arrecada fundos para cestas básicas",
    texto: "O bazar realizado em abril arrecadou fundos suficientes para a montagem de 40 cestas básicas distribuídas às famílias acompanhadas pelo grupo."
  }
];

function obterNoticias() {
  const salvas = JSON.parse(localStorage.getItem("noticias") || "[]");
  return [...salvas, ...NOTICIAS_PADRAO];
}

function renderizarNoticias(seletor, limite) {
  const alvo = document.querySelector(seletor);
  if (!alvo) return;

  let noticias = obterNoticias();
  if (limite) noticias = noticias.slice(0, limite);

  alvo.innerHTML = noticias.map(n => `
    <article class="cartao">
      <p class="data">${n.data}</p>
      <h3>${n.titulo}</h3>
      <p>${n.texto}</p>
    </article>
  `).join("");
}

renderizarNoticias("#lista-noticias");
renderizarNoticias("#noticias-destaque", 3);

/* ---------- Formulário de contato (RF04) ----------
   Como o site não está no ar, as mensagens são validadas e
   armazenadas no localStorage, podendo ser lidas na área
   administrativa. Em produção, seriam enviadas a um servidor. */

const formContato = document.getElementById("form-contato");
if (formContato) {
  formContato.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    const feedback = document.getElementById("feedback-contato");

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

    const mensagens = JSON.parse(localStorage.getItem("mensagens") || "[]");
    mensagens.unshift({
      nome,
      email,
      mensagem,
      data: new Date().toLocaleString("pt-BR")
    });
    localStorage.setItem("mensagens", JSON.stringify(mensagens));

    feedback.textContent = "Mensagem enviada com sucesso! Obrigado pelo contato.";
    feedback.className = "msg-feedback sucesso";
    formContato.reset();
  });
}

/* ---------- Transparência ---------- */

const corpoPrestacao = document.getElementById("corpo-prestacao");
if (corpoPrestacao) {
  const prestacoes = JSON.parse(localStorage.getItem("prestacoes") || "[]");
  const novasLinhas = prestacoes.map(p => `
    <tr>
      <td>${p.periodo}</td>
      <td>${p.recebidos}</td>
      <td>${p.aplicados}</td>
      <td>${p.destinacao}</td>
    </tr>
  `).join("");
  corpoPrestacao.insertAdjacentHTML("afterbegin", novasLinhas);
}
