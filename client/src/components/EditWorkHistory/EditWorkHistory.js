import React, { Component } from 'react';
import axios from 'axios';
import { WorkHistoryCard, WorkHistoryEdit } from './components';

class EditWorkHistory extends Component {
    state = {
        workhistory: ""
    }
    componentDidMount() {
        this.loadData()
    }
    loadData = () => {
        axios
            .get('/api/workhistory/all')
            .then(response => {
                this.setState({
                    workhistory: response.data
                }, () => console.log(response.data))
            })
            .catch(error => console.error(error));
    }
    renderCards = () => {
        return this.state.workhistory.map((elem, i) => {
            return (<WorkHistoryCard key={i} loadData={this.loadData} info={elem} />)
        })
    }
    render() {
        return (
            <div className="jumbotron">
                <div className="card">
                    <div className="card-body">
                        <WorkHistoryEdit newFlag={true} loadData={this.loadData} />
                    </div>
                </div>
                {(this.state.workhistory) ? this.renderCards() : ''}

            </div>
        )
    }
}

export default EditWorkHistory;