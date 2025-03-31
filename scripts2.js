let btnNext = document.querySelector('.next2')
let btnBack = document.querySelector('.back2')

let container2 = document.querySelector('.container2')
let list2 = document.querySelector('.container2 .list2')
let thumb = document.querySelector('.container2 .thumb')

btnNext.onclick = () => moveItemsOnClick('next2')
btnBack.onclick = () => moveItemsOnClick('back2')


function moveItemsOnClick(type) {
    let listItems = document.querySelectorAll('.list2 .list-item')
    let thumbItems = document.querySelectorAll('.thumb .thumb-item')


    if (type === 'next2') {
        list2.appendChild(listItems[0])
        thumb.appendChild(thumbItems[0])
        container2.classList.add('next2')
    } else {
        list2.prepend(listItems[listItems.length - 1])
        thumb.prepend(thumbItems[listItems.length - 1])
        container2.classList.add('back2')
    }

    setTimeout(() => {
        container2.classList.remove('next2')
        container2.classList.remove('back2')
    }, 3000);
}