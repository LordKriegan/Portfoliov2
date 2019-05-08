import React, { Component } from 'react';
import axios from 'axios';

class EducationEdit extends Component {
    state = {
        school: this.props.school,
        degree: this.props.degree,
        yearStart: this.props.yearStart,
        yearEnd: this.props.yearEnd
    }
    onChangeHandler = (e) => {
        e.preventDefault();
        const { target: { name, value } } = e;
        this.setState({
            [name]: value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        axios
            .put('/api/education/' + this.props.id, {
                school: this.state.school,
                degree: this.state.degree,
                yearStart: this.state.yearStart,
                yearEnd: this.state.yearEnd
            })
            .then((response) => {
                console.log(response.data);

                this.props.edit(this.props.loadData);
            })
            .catch((error) => console.error(error))
    }
    render() {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="userName">School: </label>
                    <input onChange={this.onChangeHandler} name="school" value={this.state.school} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="userName">Degree: </label>
                    <input onChange={this.onChangeHandler} name="degree" value={this.state.degree} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="userName">Year Start: </label>
                    <input onChange={this.onChangeHandler} name="yearStart" value={this.state.yearStart} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="userName">Year End: </label>
                    <input onChange={this.onChangeHandler} name="yearEnd" value={this.state.yearEnd} type="text" className="form-control" />
                </div>
                <button onClick={this.onSubmit} type="submit" className="btn btn-default">Submit</button>

            </form>
        )
    }
}

export default EducationEdit;