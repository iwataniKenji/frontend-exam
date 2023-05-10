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
