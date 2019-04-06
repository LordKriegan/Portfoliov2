import React from 'react';

const ProjectList = (props) => {
    return (
        <form>
            <div className="form-group row">
                <label className="col-2" htmlFor="projectSelect">Select a Project</label>
                <div className="col-10">
                <select name={props.name} onChange={props.onChange} style={{ width: "100%" }} className="form-control-lg" id="projectSelect">
                    <option value=""></option>
                    {props.projectList.map((elem, i) => {
                        return (
                            <option value={elem.id} key={i}>{elem.title}</option>
                        )
                    })}
                </select>
                </div>
            </div>
        </form>
    )
}

export default ProjectList;