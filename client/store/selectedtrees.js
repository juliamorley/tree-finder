import axios from 'axios'

//ACTION TYPES
const ADD_TREE = 'ADD_TREE'
const REMOVE_TREE = 'REMOVE_TREE'

//INITIAL STATE
const selectedTrees = []

//ACTION CREATORS
const addTree = tree => ({ type: ADD_TREE, tree });
const removeTree = tree => ({ type: REMOVE_TREE, tree});


// REDUCER
export default function (state = selectedTrees, action) {
  switch (action.type) {
    case ADD_TREE:
      return action.tree
    case: REMOVE_TREE
        return REMOVE_TREE
    default:
      return state
  }
}