import React, { Component } from 'react';
import { Education, EducationEdit } from './';
import axios from 'axios';

class EducationCard extends Component {
    state = {
        edit: false
    }
    deleteEd = (id) => {
        axios
            .delete('/api/education/' + id)
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
                    ? <Education edit={this.toggleEdit} delete={() => this.deleteEd(this.props.info.id)} degree={this.props.info.degree} school={this.props.info.school} yearStart={this.props.info.yearStart} yearEnd={this.props.info.yearEnd} />
                    : <EducationEdit edit={this.toggleEdit} id={this.props.info.id} loadData={this.props.loadData} degree={this.props.info.degree} school={this.props.info.school} yearStart={this.props.info.yearStart} yearEnd={this.props.info.yearEnd} /> }
                    </div>
            </div>
        )
    }
}

export default EducationCard;