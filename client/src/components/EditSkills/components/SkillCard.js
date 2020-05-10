import React, { Component } from 'react';
import { Skill, SkillEdit } from './';
import axios from 'axios';

class SkillCard extends Component {
    state = {
        edit: false
    }
    deleteSkill = (id) => {
        axios
            .delete('/api/skills/' + id)
            .then(response => {
                console.log(response.data);
                this.props.loadData();
            })
            .catch(error => console.error(error));
    }

    toggleEdit = (cb) => {
            this.setState({
                edit: !this.state.edit
            }, cb())  
    }
    render() {
        return (
            <div className="card">
                <div className="card-body text-center">
                    {(!this.state.edit)  
                    ? <Skill edit={this.toggleEdit} delete={() => this.deleteSkill(this.props.info.id)} name={this.props.info.name} rating={this.props.info.rating} />
                    : <SkillEdit newFlag={false} edit={this.toggleEdit} id={this.props.info.id} loadData={this.props.loadData} name={this.props.info.name} rating={this.props.info.rating} /> }
                    </div>
            </div>
        )
    }
}

export default SkillCard;