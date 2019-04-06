import React from 'react';

const Links = (props) => {
    return (<>
        <div className="form-group row">
            <label className="col-2" htmlFor="github link">Github Link</label>
            <div className="col-10">
                <input style={{ width: "100%" }} name="ghLink" value={props.ghLink} onChange={props.onChange} />
            </div>
        </div>
        <div className="form-group row">
            <label className="col-2" htmlFor="Live link">Live Link</label>
            <div className="col-10">
                <input style={{ width: "100%" }} name="liveLink" value={props.liveLink} onChange={props.onChange} />
            </div>
        </div>
        </>)
}

export default Links;