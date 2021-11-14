 let menu = document.querySelector('.menuBurger')
 let menu_bar = document.querySelector('.menu_bar')
 let menu = document.querySelector('.menu')
 menu.onclick = function (){
  menu_bar.classList.toggle('menu_bar')
  menu_bar.classList.toggle('menu_bar_mobile')
  menu.classList.toggle('menu_mobile')
 }
