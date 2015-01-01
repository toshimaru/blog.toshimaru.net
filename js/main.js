(function() {
  $('#toggle-menu').on('click', function() {
    $('#toggle-item').toggleClass('fadeInDown');
    return $('#navigation').toggleClass('active');
  });

  $('.icon-search').on('click', function() {
    var $txtbox;
    $('#search-form').toggleClass('slideInRight');
    $txtbox = $('.search-txt');
    return $txtbox.focus();
  });

}).call(this);
