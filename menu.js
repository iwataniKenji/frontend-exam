const menuItemsEl = document.querySelector(".menu-items");

function toggleMenu() {
  menuItemsEl.classList.toggle("show");
}

module.exports = {
  toggleMenu,
};
