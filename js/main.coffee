---
---

$('#toggle-menu').on 'click', ->
  $('#toggle-item')[0].classList.toggle('fadeInDown')
  $('#navigation')[0].classList.toggle('active')

$('.icon-search').on 'click', ->
  $('#search-form')[0].classList.toggle('slideInRight')
