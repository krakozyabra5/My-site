 let menu = document.querySelector('.menuBurger')
 let menu_bar = document.querySelector('.menu_bar')
 menu.onclick = function (){
  menu_bar.classList.toggle('menu_bar')
  menu_bar.classList.toggle('menu_bar_mobile')
 }
