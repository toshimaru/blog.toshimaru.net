$(() => {
  $('#toggle-menu').on('click', () => {
    $('#toggle-item').toggleClass('fadeInDown');
    $('#navigation').toggleClass('active');
  });

  $('.icon-search').on('click', () => {
    let $txtbox;
    $('#search-form').toggleClass('slideInRight');
    $txtbox = $('.search-txt');
    $txtbox.focus();
  });
})
