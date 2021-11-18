$(function(){
  $('.menuBurger').on('click', function(){
    $('.menu_bar').slideToggle(200, function(){
      if($(this).css('display') === 'none'){
      $(this).removeAttr('style');
  }
});
});
});

let menu_rotate_2 = document.querySelector('.menu_rotate_2')
menu_rotate_2.onclick = function () {
menu_rotate_2.classList.toggle('menu_rotate_2')
menu_rotate_2.classList.toggle('menu_rotate')
}
