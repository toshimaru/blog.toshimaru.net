"use strict"

const searchIcon = document.querySelector("#search-icon")
searchIcon.addEventListener('click', () => {
  const searchForm = document.querySelector("#search-form")
  searchForm.classList.toggle("slideInRight")
  const searchBox = document.querySelector('.search-txt')
  searchBox.focus()
})

const menu = document.querySelector("#toggle-menu")
menu.addEventListener('click', () => {
  const navigation = document.querySelector('#navigation')
  navigation.classList.toggle("active")
})
