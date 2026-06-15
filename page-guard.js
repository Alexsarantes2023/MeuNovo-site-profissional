// Lista de páginas permitidas
const paginasPermitidas = [
    "/",
    "/index.html",
    "alexarantes.com.br",
    "alexarantes.com.br/login.html",
    "alexarantes.com.br/pages/home/home.html",
    "alexarantes.com.br/pages/register/register.html",
    "alexarantes.com.br/dev-web-fullstack.html",
    "alexarantes.com.br/cyber-security.html",
    "alexarantes.com.br/dev-desktop-mobile.html",
    "alexarantes.com.br/lei_geral_lgpd.html"
];

// Função que verifica se a página atual é permitida
function verificarAcesso() {
  const caminhoAtual = window.location.pathname;

  if (!paginasPermitidas.includes(caminhoAtual)) {
    // Se não estiver na lista, redireciona ou bloqueia
    alert("Acesso negado!");
    window.location.href = "/index.html"; // redireciona para página segura
  }
}

// Executa a verificação ao carregar
verificarAcesso();
