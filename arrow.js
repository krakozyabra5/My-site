let arrow_next = document.querySelector('.arrow_next');
let arrow_previous = document.querySelector('.arrow_previous');
let div_next = document.querySelector('.div_next');
let div_previous = document.querySelector('.div_previous');

arrow_next.onclick = function () {
  div_next.classList.toggle('hidden')
  div_previous.classList.toggle('hidden')
}

arrow_previous.onclick = function () {
  div_next.classList.toggle('hidden')
  div_previous.classList.toggle('hidden')
}
