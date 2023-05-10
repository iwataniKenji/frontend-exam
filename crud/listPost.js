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
