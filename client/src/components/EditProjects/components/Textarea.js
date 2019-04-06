import React from 'react';

const Textarea = (props) => {
    return(
        <textarea rows="3" style={{ width: "100%" }} name={props.name} value={props.value} onChange={props.onChange}></textarea>
    )
}

export default Textarea;