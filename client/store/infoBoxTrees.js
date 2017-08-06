//ACTION TYPES
const ADD_TREE_INFO = 'ADD_TREE_INFO'
const REMOVE_TREE_INFO = 'REMOVE_TREE_INFO'

//INITIAL STATE
const selectedTrees = []

//ACTION CREATORS
export const addTreeInfo = tree => ({ type: ADD_TREE_INFO, tree });
export const removeTreeInfo = tree => ({ type: REMOVE_TREE_INFO, tree});


// REDUCER
export default function (state = selectedTrees, action) {
  switch (action.type) {
    case ADD_TREE_INFO:
      return [...state, action.tree.tree_id];
    case REMOVE_TREE_INFO:
      return state.filter(treeId => treeId !== action.tree.tree_id);
    default:
      return state
  }
}
