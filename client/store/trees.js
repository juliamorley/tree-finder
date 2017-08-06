import axios from 'axios'

//ACTION TYPES
const GOT_TREES = 'GOT_TREES'
const UPDATE_TREE_INFO = 'UPDATE_TREE_INFO'

//INITIAL STATE
const defaultTrees = []

//ACTION CREATORS
const gotTrees = trees => ({ type: GOT_TREES, trees })
export const updateTreeInfo = tree => ({ type: UPDATE_TREE_INFO , tree })

//THUNK CREATORS

export const fetchTrees = () =>
  dispatch =>
    axios({
      method: 'get',
      url: "https://data.cityofnewyork.us/resource/5rq2-4hqu.json?$limit=20000",
      dataType: "json",
      limit: 10
    })
      .then(res => {
        const trees = res.data
        trees.forEach(tree => {tree.showInfo = false})
        dispatch(gotTrees(trees))
      }
      )
      .catch(err => console.log(err))

// REDUCER
export default function (state = defaultTrees, action) {
  switch (action.type) {
    case GOT_TREES:
      return action.trees
    case UPDATE_TREE_INFO:
      return state.filter(tree => tree.tree_id !== action.tree.tree_id).concat(action.tree);
    default:
      return state
  }
}
