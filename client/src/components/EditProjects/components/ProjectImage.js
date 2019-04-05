import React from 'react';
import { MdClear } from 'react-icons/md';

const ProjectImage = (props) => {
    return (<div className="justify-content-center" style={{
        border: "groove",
        position: "relative",
        margin: "5px",
    }}>
        <img style={{height: "240px", width: "320px", objectFit: "scale-down"}} className="img-fluid mx-auto d-block" src={props.image} />
        <button style={{
            
            position: "absolute",
            borderRadius: "50%",
            top: "0px",
            right: "0px"
        }} onClick={props.removeImg}><MdClear /></button>
    </div>)
}

export default ProjectImage;