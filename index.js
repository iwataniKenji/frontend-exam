const { renderPostsList } = require("./crud/listPost.js");
const { submitForm } = require("./crud/createPost.js");
const {
  onAddButtonClick,
  onDialogClose,
  onSearchButtonClick,
} = require("./dialog.js");
const { onSearchPost } = require("./crud/searchPost.js");
const { toggleMenu } = require("./menu.js");
const { posts } = require("./crud/listPost.js");

const menuButtonEl = document.querySelector(".menu-button");
const menuItemsEl = document.querySelector(".menu-items");
const addButtonEl = menuItemsEl.querySelector(".add-button");
const searchButtonEl = menuItemsEl.querySelector(".search-button");
const formEl = document.querySelector(".form");
const closeDialogButtonEl = document.querySelector(".close-button");
const findButtonEl = document.querySelector(".find-button");

console.log("posts", posts);
renderPostsList(posts);

menuButtonEl.addEventListener("click", toggleMenu);
addButtonEl.addEventListener("click", onAddButtonClick);
searchButtonEl.addEventListener("click", onSearchButtonClick);
closeDialogButtonEl.addEventListener("click", onDialogClose);
formEl.addEventListener("submit", submitForm);
findButtonEl.addEventListener("click", onSearchPost);

document.addEventListener("DOMContentLoaded", function () {
  var form = document.querySelector("form");

  form.onkeydown = function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
});
