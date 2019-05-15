import React, { Component } from 'react';
import { WorkHistory, WorkHistoryEdit } from './';
import axios from 'axios';

class WorkHistoryCard extends Component {
    state = {
        edit: false
    }
    deleteWorkHist = (id) => {
        axios
            .delete('/api/workhistory/' + id)
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
                    ? <WorkHistory edit={this.toggleEdit} delete={()=>this.deleteWorkHist(this.props.info.id)} employer={this.props.info.employer} title={this.props.info.title} yearStart={this.props.info.yearStart} yearEnd={this.props.info.yearEnd} />
                    : <WorkHistoryEdit newFlag={false} edit={this.toggleEdit} id={this.props.info.id} loadData={this.props.loadData} employer={this.props.info.employer} title={this.props.info.title} yearStart={this.props.info.yearStart} yearEnd={this.props.info.yearEnd} />
                    }
                </div>
            </div>
        )
    }
}

export default WorkHistoryCard;