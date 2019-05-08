import React, { Component } from 'react';

class Education extends Component {
    render() {
        return (<>
            <div className="card-text">{this.props.school}</div>
            <div className="card-text">{this.props.degree}</div>
            <div className="card-text">{this.props.yearStart}-{this.props.yearEnd}</div>
            <div className="btn-group float-right">
                <button onClick={this.props.delete} className="btn btn-danger">Delete</button>
                <button onClick={() => this.props.edit(() => console.log("editing this project"))} className="btn btn-primary">Edit</button>
            </div>
        </>)
    }

}

export default Education;