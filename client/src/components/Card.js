import React from 'react';

function Card(props) {
    return (
        <div style={(props.heightFix) ? props.heightFix : {}} className="card">
            <div className="card-header">
                <span className={"font-italic " + props.titleClass}>{props.title}</span>
            </div>
            <div className={"card-body " + props.bodyClass}>
                {props.children}
            </div>
        </div>
    );
}

export default Card;
