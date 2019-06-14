import React, { Component } from 'react';
import { FaStar } from 'react-icons/fa'

class Skill extends Component {
    render() {
        return (<>
            <div className="card-text">Name: {this.props.name}</div>
            <div className="card-text">Rating: {Array.from({length: this.props.rating}).map((e,i) => <FaStar key={i}/>)}</div>
            <div className="btn-group float-right">
                <button onClick={this.props.delete} className="btn btn-danger">Delete</button>
                <button onClick={() => this.props.edit(() => console.log("editing skill"))} className="btn btn-primary">Edit</button>
            </div>
        </>)
    }

}

export default Skill;