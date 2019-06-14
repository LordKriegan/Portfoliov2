import React, { Component } from 'react';
import axios from 'axios';

class SkillEdit extends Component {
    state = {
        name: this.props.name || '',
        rating: this.props.rating || ''
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
        if (!this.state.name || !this.state.rating) return;
        let axCall, axUrl = '/api/skills';
        if (this.props.newFlag) {
            axCall = axios.post;
        }
        else {
            axCall = axios.put
            axUrl += '/' + this.props.id
        }
        axCall(axUrl, {
            name: this.state.name,
            rating: this.state.rating,
        })
            .then((response) => {
                console.log(response.data);
                this.setState({
                    name: '',
                    rating: ''
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
                    <label htmlFor="name">Name: </label>
                    <input onChange={this.onChangeHandler} name="name" value={this.state.name} type="text" className="form-control" />
                </div>

                <div className="form-group">
                    <label htmlFor="rating">Rating: </label>
                    <input onChange={this.onChangeHandler} name="rating" value={this.state.rating} type="number" min="1" max="5" className="form-control" />
                </div>
                <button onClick={this.onSubmit} type="submit" className="btn btn-default">{(this.props.newFlag) ? "Add New" : "Submit"}</button>

            </form>
        )
    }
}

export default SkillEdit;