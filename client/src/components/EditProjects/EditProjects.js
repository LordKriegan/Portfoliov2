import React, { Component } from 'react';
import { ProjectList, Project } from './components';
import axios from 'axios';

class EditProjects extends Component {
    state = {
        projectList: '',
        projectId: ''
    }
    componentDidMount() {
        axios
            .get("/api/projects/all")
            .then((response) => {
                console.log(response.data)
                this.setState({
                    projectList: response.data
                })
            })
            .catch((error) => {
                console.error(error);
            })
    }
    onChange = ({ target: { name, value } }) => {
        this.setState({
            [name]: value
        })
    }
    render() {
        return (
            <div className='jumbotron'>
                <div className="row">
                    <div className="col-8">
                        {
                            (this.state.projectList)
                                ? <ProjectList name="projectId" onChange={this.onChange} projectList={this.state.projectList} />
                                : <p>Loading Data...</p>
                        }
                    </div>
                    <div className="col-4">
                        <button onClick={() => this.setState({ projectId: "new project" })} type="button" className="btn btn-primary">Add New Project...</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {(this.state.projectId) ? <Project projectId={this.state.projectId} /> : ""}
                    </div>
                </div>

            </div>
        )
    }

}

export default EditProjects;