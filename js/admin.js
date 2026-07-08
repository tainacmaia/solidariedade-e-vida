/* ============================================================
   Área administrativa

   Observação: para esta demonstração estou incluindo usuário e senhas fixos
     Usuário: admin
     Senha:   gsolivida123
   ============================================================ */

const USUARIO_PADRAO = "admin";
const SENHA_PADRAO = "gsolivida123";

const caixaLogin = document.getElementById("caixa-login");
const painel = document.getElementById("painel-admin");

/* ---------- Sessão ---------- */

function estaLogado() {
  return sessionStorage.getItem("logado") === "sim";
}

function atualizarTela() {
  if (estaLogado()) {
    caixaLogin.style.display = "none";
    painel.classList.add("visivel");
    listarMensagens();
  } else {
    caixaLogin.style.display = "block";
    painel.classList.remove("visivel");
  }
}

/* ---------- Login ---------- */

document.getElementById("form-login").addEventListener("submit", (evento) => {
  evento.preventDefault();

  const usuario = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value;
  const feedback = document.getElementById("feedback-login");

  if (usuario === USUARIO_PADRAO && senha === SENHA_PADRAO) {
    sessionStorage.setItem("logado", "sim");
    atualizarTela();
  } else {
    feedback.textContent = "Usuário ou senha incorretos.";
    feedback.className = "msg-feedback erro";
  }
});

document.getElementById("btn-sair").addEventListener("click", () => {
  sessionStorage.removeItem("logado");
  atualizarTela();
});

/* ---------- Publicar notícia ---------- */

document.getElementById("form-noticia").addEventListener("submit", (evento) => {
  evento.preventDefault();

  const titulo = document.getElementById("titulo-noticia").value.trim();
  const texto = document.getElementById("texto-noticia").value.trim();
  const feedback = document.getElementById("feedback-noticia");

  if (!titulo || !texto) {
    feedback.textContent = "Preencha o título e o texto da notícia.";
    feedback.className = "msg-feedback erro";
    return;
  }

  const noticias = JSON.parse(localStorage.getItem("noticias") || "[]");
  noticias.unshift({
    data: new Date().toLocaleDateString("pt-BR"),
    titulo,
    texto
  });
  localStorage.setItem("noticias", JSON.stringify(noticias));

  feedback.textContent = "Notícia publicada! Ela já aparece na página de Notícias e Eventos.";
  feedback.className = "msg-feedback sucesso";
  evento.target.reset();
});

/* ---------- Adicionar prestação de contas ---------- */

document.getElementById("form-prestacao").addEventListener("submit", (evento) => {
  evento.preventDefault();

  const periodo = document.getElementById("periodo").value.trim();
  const recebidos = document.getElementById("recebidos").value.trim();
  const aplicados = document.getElementById("aplicados").value.trim();
  const destinacao = document.getElementById("destinacao").value.trim();
  const feedback = document.getElementById("feedback-prestacao");

  if (!periodo || !recebidos || !aplicados || !destinacao) {
    feedback.textContent = "Preencha todos os campos da prestação de contas.";
    feedback.className = "msg-feedback erro";
    return;
  }

  const prestacoes = JSON.parse(localStorage.getItem("prestacoes") || "[]");
  prestacoes.unshift({ periodo, recebidos, aplicados, destinacao });
  localStorage.setItem("prestacoes", JSON.stringify(prestacoes));

  feedback.textContent = "Registro adicionado! Ele já aparece na tabela da página Transparência.";
  feedback.className = "msg-feedback sucesso";
  evento.target.reset();
});

/* ---------- Mensagens recebidas pelo formulário ---------- */

function listarMensagens() {
  const lista = document.getElementById("lista-mensagens");
  const mensagens = JSON.parse(localStorage.getItem("mensagens") || "[]");

  if (mensagens.length === 0) {
    lista.innerHTML = "<li>Nenhuma mensagem recebida até o momento.</li>";
    return;
  }

  lista.innerHTML = mensagens.map(m => `
    <li>
      <strong>${m.nome}</strong> — ${m.email}<br>
      <span class="texto-suave">${m.data}</span>
      <p>${m.mensagem}</p>
    </li>
  `).join("");
}

/* ---------- Inicialização ---------- */

atualizarTela();
