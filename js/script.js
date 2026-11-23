function baixarApk(event) {
    event.preventDefault();

    const link = document.createElement("a");
    link.href = "./downloads/app-release.apk";
    link.download = "app-release.apk";
    document.body.appendChild(link);
    link.click();
    link.remove();
}

const btnMobile = document.getElementById("btn");
const nav = document.querySelector(".nav");
const registers = document.querySelector(".registerx");
const navItens = document.querySelectorAll(".nav-itens a, .register-itens a");

function toggleMenu() {
    const active = nav.classList.toggle("active");
    btnMobile.classList.toggle("active");
    registers.classList.toggle("active");

    if (active) {
        // posiciona registerx logo abaixo do nav-itens
        const navItensEl = document.querySelector(".nav-itens");
        if (navItensEl) {
            const rect = navItensEl.getBoundingClientRect();
            registers.style.top = (rect.bottom + 8) + "px";
        }
    } else {
        registers.style.top = "";
    }

    btnMobile.setAttribute("aria-expanded", active);
    btnMobile.setAttribute("aria-label", active ? "Fechar Menu" : "Abrir Menu");
}

btnMobile.addEventListener("click", toggleMenu);

navItens.forEach((item) => {
    item.addEventListener("click", () => {
        nav.classList.remove("active");
        registers.classList.remove("active");
        btnMobile.classList.remove("active");
        btnMobile.setAttribute("aria-expanded", false);
        btnMobile.setAttribute("aria-label", "Abrir Menu");
    });
});

// Animacoes por scroll: revela quando a secao entra e reseta quando ela sai,
// para a animacao acontecer de novo a cada passagem.
function animarAoRolar(elemento, classe) {
    if (!elemento) return

    elemento.classList.add(classe)

    function verificar() {
        const caixa = elemento.getBoundingClientRect()
        const entrando = caixa.top < window.innerHeight * 0.7 && caixa.bottom > 0
        const fora = caixa.bottom < 0 || caixa.top > window.innerHeight

        if (fora) {
            elemento.classList.remove('visivel')
        } else if (entrando) {
            elemento.classList.add('visivel')
        }
    }

    window.addEventListener('scroll', verificar, { passive: true })
    window.addEventListener('resize', verificar)
    verificar()
}

animarAoRolar(document.querySelector('.questions-text'), 'animar-perguntas')
animarAoRolar(document.querySelector('.contact'), 'animar-contato')
animarAoRolar(document.querySelector('.pagamentos-section'), 'animar-pagamentos')
// Corrige o salto de ancora: espera o carregamento e desconta o cabecalho fixo
function ajustarAncora() {
    if (!window.location.hash || window.location.hash.length < 2) return

    const alvo = document.getElementById(window.location.hash.slice(1))
    if (!alvo) return

    const topo = alvo.getBoundingClientRect().top + window.pageYOffset - 150
    window.scrollTo({ top: Math.max(0, topo), left: 0, behavior: 'instant' })
}

window.addEventListener('load', ajustarAncora)
window.addEventListener('hashchange', ajustarAncora)