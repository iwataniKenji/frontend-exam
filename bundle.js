(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { posts } = require("../crud/listPost.js");
const { renderPostsList } = require("./listPost.js");
const { onDialogClose } = require("../dialog.js");

const formEl = document.querySelector(".form");
const errorMessageEl = document.querySelector(".error-message");
const titleEl = document.querySelector(".title");
const dateEl = document.querySelector(".date");
const contentEl = document.querySelector(".content");

function submitForm(event) {
  event.preventDefault();

  if (event.key === "Enter") {
    event.preventDefault();
  }

  const isValid = doFormValidation(titleEl, dateEl, contentEl);

  if (isValid) {
    const lastPostId = getLastPostIdNumber() + 1;

    posts.push({
      id: lastPostId.toString(),
      title: titleEl.value,
      date: new Date(dateEl.value),
      content: contentEl.value,
    });

    localStorage.setItem("posts", JSON.stringify(posts));

    renderPostsList(posts);

    alert("Formulário enviado com sucesso!");
    formEl.reset();

    onDialogClose();
  }
}

function getLastPostIdNumber() {
  const lastPost = posts[posts.length - 1];

  if (!lastPost) return 0;

  return parseInt(lastPost.id);
}

function doFormValidation(titleEl, dateEl, contentEl) {
  const title = titleEl.value.trim();
  const date = dateEl.value.trim();
  const content = contentEl.value.trim();

  if (title === "") {
    errorMessageEl.textContent = "O título é obrigatório.";
    return false;
  } else {
    errorMessageEl.textContent = "";
  }

  if (date === "") {
    errorMessageEl.textContent = "A data é obrigatória.";
    return false;
  } else {
    errorMessageEl.textContent = "";
  }

  if (content === "") {
    errorMessageEl.textContent = "O campo 'conteúdo' é obrigatório.";
    return false;
  } else {
    errorMessageEl.textContent = "";
  }

  return true;
}

module.exports = {
  submitForm,
};

},{"../crud/listPost.js":2,"../dialog.js":5,"./listPost.js":2}],2:[function(require,module,exports){
const { deleteById } = require("./removePost.js");

const postListEl = document.querySelector(".posts-list");

let posts;

if (localStorage.getItem("posts")) {
  const parsedArray = JSON.parse(localStorage.getItem("posts"));

  posts = parsedArray.map((post) => {
    return {
      id: post.id,
      title: post.title,
      date: new Date(post.date),
      content: post.content,
    };
  });
} else {
  posts = [];
}

function renderPostsList(posts) {
  postListEl.innerHTML = "";

  posts.forEach((post) => {
    const postItem = document.createElement("div");
    postItem.classList.add("post");
    postItem.id = post.id;

    const title = document.createElement("h2");
    title.classList.add("post-title");
    title.textContent = post.title;
    postItem.appendChild(title);

    const date = document.createElement("p");
    date.classList.add("post-date");
    date.textContent = post.date.toLocaleDateString("pt-BR");
    postItem.appendChild(date);

    const content = document.createElement("p");
    content.classList.add("info");
    content.textContent = post.content;
    postItem.appendChild(content);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Deletar";
    deleteButton.addEventListener("click", () => {
      deleteById(posts.indexOf(post), posts);

      renderPostsList(posts);
    });
    postItem.appendChild(deleteButton);

    postListEl.appendChild(postItem);
  });
}

module.exports = {
  renderPostsList,
  posts,
};

},{"./removePost.js":3}],3:[function(require,module,exports){
function deleteById(index, posts) {
  console.log("index", index);
  console.log("posts", posts);

  posts.splice(index, 1);

  localStorage.setItem("posts", JSON.stringify(posts));
}

module.exports = {
  deleteById,
};

},{}],4:[function(require,module,exports){
const { deleteById } = require("./removePost.js");
const { posts, renderPostsList } = require("../crud/listPost.js");
const { onDialogClose } = require("../dialog.js");

const postListEl = document.querySelector(".posts-list");
const formEl = document.querySelector(".form");
const titleEl = document.querySelector(".title");
const dateEl = document.querySelector(".date");

function onSearchPost() {
  const searchTitle = titleEl.value ? titleEl.value.trim().toLowerCase() : "";
  const searchDate = dateEl.value
    ? new Date(dateEl.value).toLocaleDateString()
    : "";

  const filteredPosts = posts.filter((post) => {
    const postTitle = post.title.toLowerCase();
    const postDate = new Date(post.date).toLocaleDateString();

    return postTitle.includes(searchTitle) && postDate === searchDate;
  });

  postListEl.innerHTML = "";

  if (filteredPosts.length === 0) {
    postListEl.innerHTML = "<p>Nenhuma postagem encontrada.</p>";
  } else {
    filteredPosts.forEach((post) => {
      const postElement = document.createElement("div");
      const deleteButton = document.createElement("button");
      const dateValue = new Date(post.date).toLocaleDateString();

      postElement.classList.add("post");
      postElement.innerHTML = `
              <h2 class="post-title">${post.title}</h2>
              <p class="post-date">${dateValue}</p>
              <p class="post-content">${post.content}</p>
            `;

      deleteButton.textContent = "Deletar";
      deleteButton.addEventListener("click", () => {
        deleteById(posts.indexOf(post), posts);

        renderPostsList(posts);
      });
      postElement.appendChild(deleteButton);

      postListEl.appendChild(postElement);
    });
  }

  formEl.reset();

  onDialogClose();
}

module.exports = {
  onSearchPost,
};

},{"../crud/listPost.js":2,"../dialog.js":5,"./removePost.js":3}],5:[function(require,module,exports){
const dialogWindowEl = document.querySelector(".dialog-window");
const contentLabelEl = document.querySelector(".content-label");
const contentEl = document.querySelector(".content");
const submitButtonEl = document.querySelector(".submit-button");
const findButtonEl = document.querySelector(".find-button");

function onAddButtonClick() {
  contentLabelEl.style.display = "block";
  contentEl.style.display = "block";
  submitButtonEl.style.display = "block";
  findButtonEl.style.display = "none";
  dialogWindowEl.style.display = "block";
}

function onSearchButtonClick() {
  contentLabelEl.style.display = "none";
  contentEl.style.display = "none";
  submitButtonEl.style.display = "none";
  findButtonEl.style.display = "block";
  dialogWindowEl.style.display = "block";
}

function onDialogClose() {
  dialogWindowEl.style.display = "none";
}

module.exports = {
  onAddButtonClick,
  onSearchButtonClick,
  onDialogClose,
};

},{}],6:[function(require,module,exports){
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

},{"./crud/createPost.js":1,"./crud/listPost.js":2,"./crud/searchPost.js":4,"./dialog.js":5,"./menu.js":7}],7:[function(require,module,exports){
const menuItemsEl = document.querySelector(".menu-items");

function toggleMenu() {
  menuItemsEl.classList.toggle("show");
}

module.exports = {
  toggleMenu,
};

},{}]},{},[6]);
