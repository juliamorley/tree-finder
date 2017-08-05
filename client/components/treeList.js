import React from 'react'
import { connect } from 'react-redux'

//COMPONENT
export const TreeList = (props) => {
    const { uniqueTreeNames } = props

    return (
        <div>
            {
                uniqueTreeNames.map((name, i) => (
                    <div className="col-sm-3" key={i}>
                        <span>{name}</span>
                    </div>
                ))
            }
        </div>
    )
}

//CONTAINER
const mapState = (state) => {
    return {
        uniqueTreeNames: state.trees.map(tree => tree.spc_common).filter((value, index, self) => (self.indexOf(value) === index))
    }
}

export default connect(mapState)(TreeList)

