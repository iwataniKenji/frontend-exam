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
