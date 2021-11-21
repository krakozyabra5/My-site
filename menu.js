$(function(){
  $('.menuBurger').on('click', function(){
    $('.menu_bar').slideToggle(200, function(){
      if($(this).css('display') === 'none'){
      $(this).removeAttr('style');
  }
});
});
});
