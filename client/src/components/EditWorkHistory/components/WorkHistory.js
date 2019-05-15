import React, { Component } from 'react';

class WorkHistory extends Component {
    render() {
        return (<>
            <div className="card-text">{this.props.employer}</div>
            <div className="card-text">{this.props.title}</div>
            <div className="card-text">{this.props.yearStart}-{this.props.yearEnd || 'present'}</div>
            <div className="btn-group float-right">
                <button onClick={this.props.delete} className="btn btn-danger">Delete</button>
                <button onClick={() => this.props.edit(() => console.log("editing this work history"))} className="btn btn-primary">Edit</button>
            </div>
        </>)
    }

}

export default WorkHistory;