import React, { Component } from 'react';
import axios from 'axios';
import { SkillCard, SkillEdit } from './components'

class Skills extends Component {
    state = {
        skills: ""
    }
    componentDidMount() {
        this.loadData()
    }
    loadData = () => {
        axios
            .get('/api/skills/all')
            .then(response => {
                this.setState({
                    skills: response.data
                }, () => console.log(response.data))
            })
            .catch(error => console.error(error));
    }
    renderCards = () => {
        return this.state.skills.map((elem, i) => {
            return (<SkillCard key={i} loadData={this.loadData} info={elem} />)
        })
    }
    render() {
        return (
            <div className="jumbotron">
                <div className="card">
                    <div className="card-body">
                        <SkillEdit newFlag={true} loadData={this.loadData} />
                    </div>
                </div>
                {(this.state.skills) ? this.renderCards() : ''}

            </div>
        )
    }
}

export default Skills;