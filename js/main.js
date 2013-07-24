$(function() {
  "use strict";

  $('#toggle-menu').on('click', function () {
    $('#navigation').toggleClass('active');
    $('#toggle-item').toggleClass('fadeInDown');
  });
});