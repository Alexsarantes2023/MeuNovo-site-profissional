(function () {
    let btnNext = document.querySelector('.next2')
    let btnBack = document.querySelector('.back2')

    let container2 = document.querySelector('.container2')
    let list2 = document.querySelector('.container2 .list2')
    let thumb = document.querySelector('.container2 .thumb')

    // Tempo de cada troca automatica do carrossel de "Beneficios"
    const INTERVALO_AUTOPLAY = 6000;
    let autoplayId = null;

    function iniciarAutoplay() {
        pararAutoplay();
        autoplayId = setInterval(() => moveItemsOnClick('next2'), INTERVALO_AUTOPLAY);
    }

    function pararAutoplay() {
        if (autoplayId !== null) {
            clearInterval(autoplayId);
            autoplayId = null;
        }
    }

    // Clique manual reinicia a contagem para nao trocar duas vezes seguidas
    btnNext.onclick = () => {
        moveItemsOnClick('next2');
        iniciarAutoplay();
    };
    btnBack.onclick = () => {
        moveItemsOnClick('back2');
        iniciarAutoplay();
    };


    function moveItemsOnClick(type) {
        let listItems = document.querySelectorAll('.list2 .list-item')
        let thumbItems = document.querySelectorAll('.thumb .thumb-item')


        if (type === 'next2') {
            list2.appendChild(listItems[0])
            thumb.appendChild(thumbItems[0])
            container2.classList.add('next2')
        } else {
            list2.prepend(listItems[listItems.length - 1])
            thumb.prepend(thumbItems[thumbItems.length - 1])
            container2.classList.add('back2')
        }

        setTimeout(() => {
            container2.classList.remove('next2')
            container2.classList.remove('back2')
        }, 3000);
    }

    // Inicia o carrossel automatico assim que o script carrega
    iniciarAutoplay();
})();
