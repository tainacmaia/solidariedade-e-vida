/* ============================================================
   Cabeçalho e rodapé compartilhados por todas as páginas.

   Como o site está sendo aberto localmente, não é possível
   carregar arquivos HTML externos com fetch(). Por isso, o
   header e o footer ficam definidos aqui e são injetados nos
   elementos <header> e <footer> de cada página.
   ============================================================ */

/* ---------- Cabeçalho ---------- */

const HTML_CABECALHO = `
  <div class="container barra-nav">
    <a href="index.html" class="logo"><span class="laco">&#127895;</span> Solidariedade é Vida</a>
    <button id="btn-menu" aria-label="Abrir menu">&#9776;</button>
    <nav>
      <ul>
        <li><a href="index.html">Início</a></li>
        <li><a href="atividades.html">Atividades</a></li>
        <li><a href="noticias.html">Notícias e Eventos</a></li>
        <li><a href="contribua.html">Como Contribuir</a></li>
        <li><a href="transparencia.html">Transparência</a></li>
        <li><a href="contato.html">Contato</a></li>
        <li><a href="admin.html">Área Administrativa</a></li>
      </ul>
    </nav>
  </div>
`;

/* ---------- Rodapé (barra fixa e compacta) ---------- */

const HTML_RODAPE = `
  <div class="container conteudo-rodape">
    <span><strong>Grupo Solidariedade é Vida</strong> — São Luís (MA)</span>
    <span>
      <a href="https://www.instagram.com/gsolivida10" target="_blank" rel="noopener">Instagram</a> ·
      <a href="contato.html">Contato</a>
    </span>
  </div>
`;

/* ---------- Injeção nos elementos da página ---------- */

document.querySelector("header").innerHTML = HTML_CABECALHO;
document.querySelector("footer").innerHTML = HTML_RODAPE;

/* ---------- Marca o link da página atual como ativo ---------- */

const paginaAtual = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("nav a").forEach((link) => {
  if (link.getAttribute("href") === paginaAtual) {
    link.classList.add("ativo");
  }
});

/* ---------- Menu responsivo ---------- */

document.getElementById("btn-menu").addEventListener("click", () => {
  document.querySelector("nav ul").classList.toggle("aberto");
});
