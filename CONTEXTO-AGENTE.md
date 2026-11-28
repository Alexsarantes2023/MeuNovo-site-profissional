# Contexto do projeto para agentes

Este arquivo registra o contexto essencial para continuar o trabalho sem depender
de conversas ou memoria de sessoes anteriores. Leia este documento e `agent.md`
antes de alterar o projeto.

## Objetivo e limites

- Esta pasta e a versao limpa e organizada do site.
- O projeto original fica na pasta pai. Trabalhe somente em `codigo_limpo/`,
  salvo pedido explicito do usuario para alterar o original.
- Nao use o Kilo nem arquivos da pasta `.kilo`.
- Mantenha somente paginas, scripts, estilos, imagens e outros recursos
  efetivamente utilizados.
- Antes de remover um recurso, confirme que ele nao e referenciado por HTML,
  CSS, JavaScript, navegacao ou download.

## Estrutura atual

```text
codigo_limpo/
|-- index.html                 # Pagina principal; unico HTML na raiz
|-- login.html                 # Redirecionamento legado para html/login.html
|-- README.md                  # Resumo e forma de executar
|-- CONTEXTO-AGENTE.md         # Este documento
|-- agent.md                   # Regras permanentes de organizacao
|-- robots.txt
|-- sitemap.xml
|-- html/                      # Paginas secundarias do site
|   |-- cyber-security.html
|   |-- dev-desktop-mobile.html
|   |-- dev-web-fullstack.html
|   |-- lei_geral_lgpd.html
|   |-- login.html
|   |-- pages/
|       |-- home/home.html
|       |-- register/register.html
|-- css/                       # Folhas de estilo (ver css/README.md)
|   |-- global.css             # Base das paginas de autenticacao (home, register)
|   |-- style.css              # Reset/cores do site + carrossel principal
|   |-- stylescybersecurity.css# Header, menu, rodape e icones + estilos da pagina cyber
|   |-- components.css         # Cards, planos, perguntas, pagamentos, contato
|   |-- usuarioPosts.css       # Barra de usuario (header2) e icones fixos
|   |-- mensagens.css          # Lista de mensagens (index + home)
|   |-- README.md              # Mapa de quais folhas cada pagina carrega
|   |-- pages/beneficios.css   # Carrossel da secao "Beneficios"
|   |-- pages/dev.css          # Layout das paginas dev-*
|   |-- pages/dev-desktop.css  # Ajustes exclusivos de dev-desktop-mobile
|   |-- pages/lgpd.css         # Termos de uso/LGPD
|   |-- pages/login.css        # Login completo
|   |-- pages/register/register.css
|   |-- pages/home/home.css
|-- js/                        # Scripts
|   |-- scripts compartilhados do site e autenticacao
|   |-- pages/home/            # mensagens.js
|   |-- pages/register/        # register.js
|-- assets/
|   |-- images/                # Imagens em subpastas por grupo/origem
|   |   |-- img-apps/          # Telas dos apps Android e do app desktop (mockups)
|   |-- videos/                # Videos utilizados
|-- downloads/
    |-- app-release.apk        # APK do app pessoal (pagina Dev Desktop & Mobile)
    |-- menezes-mene-v2.apk    # APK de teste do app do Ministerio (93,76 MB)
```

`pagamento-pix.html` e `area-secreta.html` nao fazem parte da navegacao da
pagina principal identificada nesta limpeza e nao foram incluidos. Nao os
reintroduza sem confirmar que voltaram a ser utilizados.

## Regras de caminhos e dependencias

- A raiz publicada e `codigo_limpo/`; `index.html` permanece nela.
- As paginas HTML reais ficam sob `html/`, preservando subpastas como
  `html/pages/home/` e `html/pages/register/`.
- `login.html` na raiz e somente um redirecionamento pequeno para manter a URL
  antiga `/login.html`; nao duplique ali o conteudo funcional do login.
- Outros aliases na raiz so devem ser criados quando houver necessidade real
  de compatibilidade, e devem redirecionar para uma pagina dentro de `html/`.
- CSS e JavaScript ficam em `css/` e `js/`. Imagens, videos e downloads ficam
  em `assets/images/`, `assets/videos/` e `downloads/`.
- Caminhos em atributos HTML devem ser relativos ao arquivo HTML que os contem.
- Caminhos `url(...)` em CSS devem ser relativos ao arquivo CSS.
- Para navegacao disparada por JavaScript, lembre-se de que `window.location`
  resolve caminhos relativos a URL da pagina, nao a localizacao do arquivo JS.
  Revise redirecionamentos de login, cadastro, logout e retorno a pagina inicial
  sempre que mover HTML ou JavaScript.
- Atualize `js/page-guard.js` quando adicionar ou renomear paginas permitidas.
- O APK e baixado pelo script `js/script.js`; mantenha o caminho coerente com
  `downloads/app-release.apk`.
- Scripts Firebase externos devem continuar carregados antes dos scripts locais
  que usam Firebase.
- O Google Tag Manager (`GTM-P2W8QTHC`) esta em `index.html` e em
  `html/dev-web-fullstack.html`: script no `<head>` e `noscript` logo apos
  `<body>`. Ao replicar para outras paginas, mantenha os dois blocos e a mesma
  ordem.
- `robots.txt` aponta para `sitemap.xml`; mantenha os dois coerentes com as
  rotas publicadas.

## Regras de CSS

- O mapa de folhas por pagina esta em `css/README.md`; mantenha-o atualizado ao
  criar ou mover arquivos CSS.
- Nao duplique regras entre folhas: estilo compartilhado fica em
  `components.css` ou `stylescybersecurity.css`; estilo de pagina fica em
  `css/pages/`.
- Respeite a ordem de carregamento: base -> compartilhado -> pagina; o CSS de
  pagina entra por ultimo para sobrescrever sem `!important`.
- `css/pages/beneficios.css` repete `@keyframes` dentro de media queries de
  proposito: sao variantes por breakpoint, pois CSS nao permite escopar
  `@keyframes` por largura de tela. Nao remova as repeticoes.

## Execucao e validacao

- Execute um servidor estatico apontando para esta pasta e abra `index.html`.
  A integracao de login, cadastro e mensagens depende do Firebase configurado.
- Depois de alterar caminhos ou mover arquivos:
  1. confira todos os links e recursos locais das paginas HTML;
  2. confira `url(...)` em CSS e caminhos de arquivos usados pelos scripts;
  3. execute `node --check` em cada arquivo JavaScript alterado;
  4. abra a pagina inicial e as paginas afetadas no navegador;
  5. confira erros 404 e se imagens, estilos e scripts carregam.
- Antes de finalizar, confira que apenas `index.html` e aliases de
  redirecionamento estritamente necessarios estao na raiz como HTML, e que
  nenhuma alteracao foi feita fora de `codigo_limpo/`.

## Observacao conhecida

Nenhum erro conhecido no momento. `js/firebase-init.js` ja nao quebra em paginas
sem `#usuarioInfo`/`#logoutBtn`, `js/pages/home/mensagens.js` nao conflita mais com
`const db` e o Firebase esta padronizado em 10.12.2 compat.
