$(function() {
  "use strict";

  $('#toggle-menu').on('click', function () {
    $('#navigation').toggleClass('active');
    $('#toggle-item').toggleClass('fadeInDown');
  });

  $('.icon-search').on('click', function () {
    $('#search-form').toggle().toggleClass('slideInRight');
  });

});
