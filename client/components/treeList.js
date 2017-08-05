import React from 'react'
import { connect } from 'react-redux'
import {addTree, removeTree} from '../store'

//COMPONENT
export const TreeList = (props) => {
    const { uniqueTreeNames } = props

    return (
        <div>
            { uniqueTreeNames.map((name, i) => (
                    <button type = "onClick" onClick={props.handleClick}  key={i} value={name}>
                        {name}
                    </button>
                ))}
        </div>
    )
}

//CONTAINER
const mapState = (state) => {
    return {
        uniqueTreeNames: state.trees.map(tree => tree.spc_common).filter((value, index, self) => (self.indexOf(value) === index))
    }
}

const mapDispatch = function(dispatch, ownProps){
   return {
       handleClick(event){
        console.log(event.target.value)
       }
   }
}

export default connect(mapState, mapDispatch)(TreeList)
