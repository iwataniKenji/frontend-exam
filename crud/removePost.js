function deleteById(index, posts) {
  console.log("index", index);
  console.log("posts", posts);

  posts.splice(index, 1);

  localStorage.setItem("posts", JSON.stringify(posts));
}

module.exports = {
  deleteById,
};
