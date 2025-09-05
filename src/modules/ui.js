import { state } from "./state.js";

export const listElement = document.getElementById("list");
export const deleteElement = document.getElementById("delete-items-button");
export const undoElement = document.getElementById("undo-button");
export const newItemElement = document.getElementById("new-item-input");
export const addItemElement = document.getElementById("add-item");
export const cancelAddItemElement = document.getElementById("cancel-item");
export const addItemOverlayElement = document.getElementById("overlay");
export const addItemForm = document.getElementById("add-item-form");
export const openAddItemModalElement = document.getElementById(
  "open-add-item-modal"
);

export function render() {
  listElement.replaceChildren();

  if (state.items.length === 0) {
    updateControls();
    return;
  }

  const fragment = document.createDocumentFragment();

  state.items.forEach((item, index) => {
    const liElement = document.createElement("li");
    liElement.classList.add("list__item");
    liElement.textContent = item;
    liElement.dataset.index = index.toString();

    fragment.appendChild(liElement);
  });

  listElement.appendChild(fragment);

  updateControls();
}

export function updateControls() {
  deleteElement.disabled = state.selectedItems.size === 0;
  addItemElement.disabled = newItemElement.value === "";
  undoElement.disabled = state.historyState.length === 0;
}

export function closeAddItemModal() {
  addItemOverlayElement.classList.remove("overlay--visible");
  newItemElement.value = "";

  updateControls();
}

export function openAddItemModal(_event) {
  addItemOverlayElement.classList.add("overlay--visible");
  newItemElement.focus();
}

export function closeAddItemModalFromOverlay(event) {
  if (event.target.id === "overlay") {
    closeAddItemModal();
  }
}
