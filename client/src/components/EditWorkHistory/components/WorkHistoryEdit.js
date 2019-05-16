import React, { Component } from 'react';
import axios from 'axios';

class EducationEdit extends Component {
    state = {
        employer: this.props.employer || '',
        title: this.props.title || '',
        yearStart: this.props.yearStart || '',
        yearEnd: this.props.yearEnd || ''
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
        if (!this.state.employer || !this.state.title || !this.state.yearStart) return;
        let axCall, axUrl = '/api/workhistory';
        if (this.props.newFlag) {
            axCall = axios.post;
        }
        else {
            axCall = axios.put
            axUrl += '/' + this.props.id
        }
        axCall(axUrl, {
            employer: this.state.employer,
            title: this.state.title,
            yearStart: this.state.yearStart,
            yearEnd: this.state.yearEnd
        })
            .then((response) => {
                console.log(response.data);
                this.setState({
                    employer: '',
                    title: '',
                    yearStart: '',
                    yearEnd: ''
                }, () => {
                    if (this.props.newFlag) {
                        this.props.loadData();
                    } else {
                        this.props.edit(this.props.loadData);
                    }
                })
            })
            .catch((error) => console.error(error))
    }
    render() {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="userName">Employer: </label>
                    <input onChange={this.onChangeHandler} name="employer" value={this.state.employer} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="userName">Title: </label>
                    <input onChange={this.onChangeHandler} name="title" value={this.state.title} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="userName">Year Start: </label>
                    <input onChange={this.onChangeHandler} name="yearStart" value={this.state.yearStart} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="userName">Year End: </label>
                    <input onChange={this.onChangeHandler} name="yearEnd" value={this.state.yearEnd} type="text" className="form-control" />
                </div>
                <button onClick={this.onSubmit} type="submit" className="btn btn-default">{(this.props.newFlag) ? "Add New" : "Submit"}</button>

            </form>
        )
    }
}

export default EducationEdit;