$(function() {
  "use strict";

  $('#toggle-menu').on('click', function () {
    $('#toggle-item')[0].classList.toggle('fadeInDown');
    $('#navigation')[0].classList.toggle('active');
  });

  $('.icon-search').on('click', function () {
    $('#search-form')[0].classList.toggle('slideInRight');
  });

});
