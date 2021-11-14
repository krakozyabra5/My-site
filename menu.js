$(function(){
  $('.menuBurger').on('click', function(){
    $('.menu').slideToggle(200, function(){
      if($(this).css('display') === 'none'){
      $(this).removeAttr('style');
  }
});
});
});
