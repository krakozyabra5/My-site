 let menu = document.querySelector('.menuBurger')
 let menu_bar = document.querySelector('.menu_bar')
 let menu_mobile = document.querySelector('.menu')
 let nav_mobile = document.querySelector('.nav')
 menu.onclick = function (){
  menu_bar.classList.toggle('menu_bar')
  menu_bar.classList.toggle('menu_bar_mobile')
  menu_mobile.classList.toggle('menu_mobile')
  nav_mobile.classList.toggle('nav_mobile')
 }
