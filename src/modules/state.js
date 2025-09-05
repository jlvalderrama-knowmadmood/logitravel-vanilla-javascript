export const state = {
  items: [],
  historyState: [],
  selectedItems: new Set(),
};

export function updateHistory() {
  state.historyState.push([...state.items]);
}
