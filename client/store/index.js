import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import trees from './trees'
import selectedTrees from './selectedTrees'

const reducer = combineReducers({user, trees, selectedTrees})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './trees'
export * from './user'
export * from './selectedTrees'

