$(function() {
  "use strict";

  $('#toggle-menu').on('click', function () {
    $('#toggle-item').toggleClass('fadeInDown');
    $('#navigation').toggleClass('active');
  });

  $('.icon-search').on('click', function () {
    $('#search-form').toggle().toggleClass('slideInRight');
  });

});
