(function () {
    const cardsWrapper = document.querySelector(".plan-content");
    const prev4 = document.querySelector(".prev4");
    const next4 = document.querySelector(".next4");

    const cardsWrapper2 = document.querySelector(".plan-content2");
    const prev5 = document.querySelector(".prev5");
    const next5 = document.querySelector(".next5");

    // Tempo de cada avanco automatico dos carrosseis de planos
    const INTERVALO_AUTOPLAY = 6000;

    // Função para rolar o card suavemente para a esquerda.
    function scrollLeft() {
        cardsWrapper.scrollBy({
            left: -400,
            behavior: "smooth",
        });
    }

    // Função para rolar o card suavemente para a direita.
    function scrollRight() {
        cardsWrapper.scrollBy({
            left: 400,
            behavior: "smooth",
        });
    }

    // Função para rolar o card suavemente para a esquerda.
    function scrollLeft2() {
        cardsWrapper2.scrollBy({
            left: -400,
            behavior: "smooth",
        });
    }

    // Função para rolar o card suavemente para a direita.
    function scrollRight2() {
        cardsWrapper2.scrollBy({
            left: 400,
            behavior: "smooth",
        });
    }

    function criarAutoplay(wrapper) {
        let id = null;

        function parar() {
            if (id !== null) {
                clearInterval(id);
                id = null;
            }
        }

        function avancar() {
            if (!wrapper) return;

            const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
            if (maxScroll <= 4) return;

            if (wrapper.scrollLeft >= maxScroll - 4) {
                wrapper.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                wrapper.scrollBy({ left: 400, behavior: "smooth" });
            }
        }

        function iniciar() {
            parar();
            id = setInterval(avancar, INTERVALO_AUTOPLAY);
        }

        return { iniciar, parar };
    }

    const autoplayPlanos = criarAutoplay(cardsWrapper);
    const autoplayPlanos2 = criarAutoplay(cardsWrapper2);

    // Adicionar um ouvinte de evento, de click nas setas (reinicia a contagem).
    prev4.addEventListener("click", () => {
        scrollLeft();
        autoplayPlanos.iniciar();
    });
    next4.addEventListener("click", () => {
        scrollRight();
        autoplayPlanos.iniciar();
    });
    prev5.addEventListener("click", () => {
        scrollLeft2();
        autoplayPlanos2.iniciar();
    });
    next5.addEventListener("click", () => {
        scrollRight2();
        autoplayPlanos2.iniciar();
    });

    autoplayPlanos.iniciar();
    autoplayPlanos2.iniciar();
})();
