const btnMobile = document.getElementById("btn");
const nav = document.querySelector(".nav");
const registers = document.querySelector(".registerx");
const navItens = document.querySelectorAll(".nav-itens a, .register-itensx a");

function toggleMenu() {
    btnMobile.classList.toggle("active");
    nav.classList.toggle("active");
    registers.classList.toggle("active");

    const active = nav.classList.contains("active");
    btnMobile.setAttribute("aria-expanded", active);
    btnMobile.setAttribute("aria-label", active ? "Fechar Menu" : "Abrir Menu");
}

// abre/fecha menu ao clicar no botão
btnMobile.addEventListener("click", toggleMenu);

// fecha menu ao clicar em qualquer link
navItens.forEach((item) => {
    item.addEventListener("click", () => {
        nav.classList.remove("active");
        register.classList.remove("active");
        btnMobile.classList.remove("active");
        btnMobile.setAttribute("aria-expanded", false);
        btnMobile.setAttribute("aria-label", "Abrir Menu");
    });
});




/*const btnMobile = document.getElementById("btn");
const nav = document.querySelector(".nav");
const register = document.querySelector(".register");
//const navItens = document.querySelectorAll(".nav-itens, .register-itens");
const navItens = document.querySelectorAll(".nav-itens a, .register-itens a");


function toggleMenu(event) {
    //console.log("click");
    btnMobile.classList.toggle("active");
    nav.classList.toggle("active");
    register.classList.toggle("active");
    const active = nav.classList.contains("active");
    event.currentTarget.setAttribute("aria-expanded", active);
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



