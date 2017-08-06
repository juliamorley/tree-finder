import React from 'react'
import { connect } from 'react-redux'
import { addTree, removeTree, selectTrue, selectFalse } from '../store'

//COMPONENT
export const TreeList = (props) => {
    const { uniqueTreeNames } = props

    return (
        <div>
            <button type="onClick" onClick={props.handleAll} value={name} className="active">
                Select All </button>
            {uniqueTreeNames.map((name, i) => (
                <button type="onClick" onClick={props.handleClick} key={i} value={name} className="normal">
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

const mapDispatch = function (dispatch, ownProps) {
    return {
        handleClick(event) {
            var className = event.target.className;
            if (className == "normal") {
                event.target.className = "active";
                dispatch(addTree(event.target.value));
            } else {
                event.target.className = "normal";
                dispatch(removeTree(event.target.value));
            }
        },
        handleAll(event) {
            var className = event.target.className;
            if (className == "active") {
                event.target.className = "normal";
                dispatch(selectFalse(event.target.value));
            } else {
                event.target.className = "active";
                dispatch(selectTrue(event.target.value));
            }
        }
    }
}

export default connect(mapState, mapDispatch)(TreeList)
