import { state, updateHistory } from "./state.js";
import {
  listElement,
  openAddItemModalElement,
  deleteElement,
  undoElement,
  newItemElement,
  cancelAddItemElement,
  addItemOverlayElement,
  addItemForm,
  render,
  updateControls,
  openAddItemModal,
  closeAddItemModal,
  closeAddItemModalFromOverlay,
} from "./ui.js";

export function bindEvents() {
  openAddItemModalElement.addEventListener("click", openAddItemModal);
  cancelAddItemElement.addEventListener("click", closeAddItemModal);
  addItemOverlayElement.addEventListener("click", closeAddItemModalFromOverlay);
  addItemForm.addEventListener("submit", addNewItem);
  newItemElement.addEventListener("input", updateControls);
  listElement.addEventListener("dblclick", deleteOneElement);
  listElement.addEventListener("click", highlightElement);
  deleteElement.addEventListener("click", deleteManyElements);
  undoElement.addEventListener("click", undo);
}

function addNewItem(event) {
  event.preventDefault();

  updateHistory();

  const newItemValue = newItemElement.value;
  state.items.push(newItemValue);

  closeAddItemModal();
  render();
}

function deleteOneElement(event) {
  if (event.target.classList.contains("list__item")) {
    const itemIndex = event.target.dataset.index;

    updateHistory();

    state.items = state.items.filter(
      (_item, index) => index !== Number(itemIndex)
    );

    if (state.selectedItems.has(itemIndex)) {
      state.selectedItems.delete(itemIndex);
    }

    state.selectedItems.clear();

    render();
  }
}

function highlightElement(event) {
  if (event.target.classList.contains("list__item")) {
    const itemIndex = event.target.dataset.index;

    if (state.selectedItems.has(itemIndex)) {
      state.selectedItems.delete(itemIndex);
    } else {
      state.selectedItems.add(itemIndex);
    }

    event.target.classList.toggle("list__item--selected");

    updateControls();
  }
}

function deleteManyElements(_event) {
  if (state.selectedItems.size === 0) {
    alert("Select elements to delete them");
    return;
  }

  updateHistory();

  state.items = state.items.filter(
    (_item, index) => !state.selectedItems.has(index.toString())
  );
  state.selectedItems.clear();

  render();
}

function undo(_event) {
  if (state.historyState.length === 0) return;

  const previousState = state.historyState.at(-1);
  state.items = [...previousState];
  state.historyState = [...state.historyState.slice(0, -1)];
  state.selectedItems.clear();

  render();
}
