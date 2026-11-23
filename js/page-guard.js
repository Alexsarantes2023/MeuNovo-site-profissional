const paginasPermitidas = [
    "/",
    "/index.html",
    "/html/login.html",
    "/html/pages/home/home.html",
    "/html/pages/register/register.html",
    "/html/dev-web-fullstack.html",
    "/html/cyber-security.html",
    "/html/dev-desktop-mobile.html",
    "/html/lei_geral_lgpd.html"
];

function verificarAcesso() {
    const caminhoAtual = window.location.pathname;
    const permitido = paginasPermitidas.some(
        pagina => caminhoAtual === pagina || caminhoAtual.endsWith(pagina)
    );

    if (permitido) {
        return;
    }

    alert("Acesso negado!");
    const htmlIndex = caminhoAtual.indexOf("/html/");
    const basePath = htmlIndex >= 0
        ? caminhoAtual.slice(0, htmlIndex)
        : caminhoAtual.slice(0, caminhoAtual.lastIndexOf("/"));
    window.location.href = `${basePath}/index.html`;
}

verificarAcesso();
