import React, { Component } from 'react';
import axios from 'axios';
import { EducationCard } from './components'

class EditEducation extends Component {
    state = {
        education: ""
    }
    componentDidMount() {
        this.loadData()
    }
    loadData = () => {
        axios
            .get('/api/education/all')
            .then(response => {
                this.setState({
                    education: response.data
                }, () => console.log(response.data))
            })
            .catch(error => console.error(error));
    }
    renderCards = () => {
        return this.state.education.map((elem, i) => {
            return(<EducationCard key={i} loadData={this.loadData} info={elem} />)
        })
    }
    render() {
        return (
            <div className="jumbotron">
                {(this.state.education) ? this.renderCards() : ''}
            </div>
        )
    }
}

export default EditEducation;