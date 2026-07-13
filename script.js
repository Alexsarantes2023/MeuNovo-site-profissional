const btnMobile = document.getElementById("btn");
const nav = document.querySelector(".nav");
const registers = document.querySelector(".registerx");
const navItens = document.querySelectorAll(".nav-itens a, .register-itens a");

//Função de abrir/fechar menu
function toggleMenu() {
    const active = nav.classList.toggle("active");
    btnMobile.classList.toggle("active");
    registers.classList.toggle("active");

    btnMobile.setAttribute("aria-expanded", active);
    btnMobile.setAttribute("aria-label", active ? "Fechar Menu" : "Abrir Menu");
}

// abre/fecha menu ao clicar no botão
btnMobile.addEventListener("click", toggleMenu);

// fecha menu ao clicar em qualquer link
navItens.forEach((item) => {
    item.addEventListener("click", () => {
        nav.classList.remove("active");
        registers.classList.remove("active");
        btnMobile.classList.remove("active");
        btnMobile.setAttribute("aria-expanded", false);
        btnMobile.setAttribute("aria-label", "Abrir Menu");
    });
});
