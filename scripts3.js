const cardsWrapper = document.querySelector(".plan-content");
const prev4 = document.querySelector(".prev4");
const next4 = document.querySelector(".next4");

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

// Adicionar um ouvinte de evento, de click nas setas.
prev4.addEventListener("click", scrollLeft);
next4.addEventListener("click", scrollRight);


/*const btnMobile = document.getElementById("btn");
const nav = document.querySelector(".nav");
const register = document.querySelector(".register");
const navItens = document.querySelectorAll(".nav-itens, .register-itens");

function toggleMenu(event) {
    //console.log("click");
    btnMobile.classList.toggle("active");
    nav.classList.toggle("active");
    register.classList.toggle("active");
    const active = nav.classList.contains("active");
    event.currentTarget.setAttribute("arial-expanded", active);
    if (active) {
        event.currentTarget.setAttribute("aria-label", "Fechar Menu");
    } else {
        event.currentTarget.setAttribute("aria-label", "Abrir Menu");
    }
}

btnMobile.addEventListener("click", toggleMenu);

navItens.forEach((item) => {
    item.addEventListener("click", toggleMenu);
});*/


