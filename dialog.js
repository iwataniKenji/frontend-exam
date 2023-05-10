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
