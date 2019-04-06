import React from 'react';

const Input = (props) => {
    return(
        <input style={{ width: "100%" }} name={props.name} value={props.value} onChange={props.onChange} />
    )
}

export default Input;