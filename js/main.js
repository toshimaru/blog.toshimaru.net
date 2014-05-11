(function() {
  $('#toggle-menu').on('click', function() {
    $('#toggle-item')[0].classList.toggle('fadeInDown');
    return $('#navigation')[0].classList.toggle('active');
  });

  $('.icon-search').on('click', function() {
    return $('#search-form')[0].classList.toggle('slideInRight');
  });

}).call(this);
