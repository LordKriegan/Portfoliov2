import React from 'react';
import { MdClear } from 'react-icons/md';
//props: tech, removeTech, addTech, newTech, onChange
const Techlist = (props) => {
    return (<div className="text-center" style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    }}>
        {(props.tech.length) ? props.tech.map((elem, i) => {
            return <span style={{
                border: "solid",
                borderRadius: "10%",
                borderWidth: "2px",
                padding: "0 10px 0 10px",
                margin: "5px"
            }} key={i}><span><button onClick={() => props.removeTech(i)} style={{marginRight: "2px", borderRadius: "50%" }} className="btn btn-outline-danger"><MdClear /></button>{elem}</span></span>
        }) : ""}
        <div className="input-group mb-3">
            <input onKeyUp={(e) => {if (e.keyCode === 13) props.addTech()}} name="newTech" value={props.newTech} onChange={props.onChange} type="text" className="form-control" placeholder="Add new tech" />
            <div className="input-group-append">
                <button onClick={props.addTech} className="btn btn-primary" type="button">Add Tech</button>
            </div>
        </div>
    </div>)
}

export default Techlist