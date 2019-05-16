import React from 'react';

const WorkEdCard = (props) => {
    return (
        <div className="card">
            <div className="card-body">
                {(props.type === 'education')
                    ? <>
                        <div className="card-text"><span className="font-weight-bold">School</span>: {props.school}</div>
                        <div className="card-text"><span className="font-weight-bold">Degree</span>: {props.degree}</div>
                    </>
                    : <>
                        <div className="card-text"><span className="font-weight-bold">Employer</span>: {props.employer}</div>
                        <div className="card-text"><span className="font-weight-bold">Title</span>: {props.title}</div>
                    </>}
                <div className="card-text">{props.yearStart} - {props.yearEnd || 'present'} </div>
            </div>
        </div>
    )
}

export default WorkEdCard;