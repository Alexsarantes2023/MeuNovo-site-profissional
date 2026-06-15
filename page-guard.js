// Lista de páginas permitidas
const paginasPermitidas = [
    "/",
    "alexarantes.com.br",
    "/index.html",
    "alexarantes.com.br/login.html",
    "/pages/home/home.html",
    "/pages/register/register.html",
    "/dev-web-fullstack.html",
    "/cyber-security.html",
    "/dev-desktop-mobile.html",
    "https://alexarantes.com.br/dev-desktop-mobile",
    "https://alexarantes.com.br/lei_geral_lgpd.html"
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
