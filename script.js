const btnMobile = document.getElementById("btn");
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
});



