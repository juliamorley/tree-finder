import axios from 'axios'

//ACTION TYPES
const SELECT_TRUE = 'SELECT_TRUE'
const SELECT_FALSE = 'SELECT_FALSE'

//INITIAL STATE
const selected = true;

//ACTION CREATORS
export const selectTrue = tree => ({ type: SELECT_TRUE, tree });
export const selectFalse = tree => ({ type: SELECT_FALSE, tree});


// REDUCER
export default function (state = selected, action) {
  switch (action.type) {
    case SELECT_TRUE:
      return true;
    case SELECT_FALSE:
      return false;
    default:
      return state
  }
}