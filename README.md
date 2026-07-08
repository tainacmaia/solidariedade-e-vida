====================================================================
Atividade Extensionista III
====================================================================

COMO EXECUTAR
-------------
Não é necessário servidor. Basta abrir o arquivo "index.html" no navegador padrão. Todas as páginas
funcionam localmente.

ESTRUTURA DE PASTAS E ARQUIVOS
-------------------
index.html          Página inicial com a seção "História"
atividades.html     Atividades realizadas
noticias.html       Notícias e eventos
contato.html        Formulário de contato
contribua.html      Formas de contribuição
transparencia.html  Prestação de contas
admin.html          Login e painel administrativo
css/style.css       Folha de estilos
js/layout.js        Cabeçalho e rodapé compartilhados (injetados em
                    todas as páginas para evitar repetição de código)
js/main.js          Notícias dinâmicas e formulário de contato
js/admin.js         Login e funções do painel administrativo

ÁREA ADMINISTRATIVA (RF07)
--------------------------
Usuário: admin
Senha:   gsolivida123

Após o login, o administrador pode:
  - Publicar notícias (aparecem na página "Notícias e Eventos")
  - Adicionar registros à tabela de prestação de contas (página "Transparência")
  - Ler as mensagens enviadas pelo formulário de contato

OBSERVAÇÕES TÉCNICAS
--------------------
- O site é um protótipo estático (HTML, CSS e JavaScript),
  conforme os objetivos do projeto.
- Como não há servidor, os dados dinâmicos (notícias publicadas,
  mensagens do formulário e registros de prestação de contas) são armazenados
  no localStorage do navegador — o suficiente para demonstrar o
  funcionamento mínimo dos requisitos.
- Em uma versão de produção, o login seria validado em servidor,
  com senhas criptografadas, e os dados seriam salvos em um banco
  de dados.
