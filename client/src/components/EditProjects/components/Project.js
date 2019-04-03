import React, { Component } from 'react';
import axios from 'axios';
const sections = {
    summary: <p>summary</p>,
    tech: <p>tech</p>,
    role: <p>role</p>,
    links: <p>links</p>,
    images: <p>images</p>
}

class Project extends Component {
    state = {
        section: "summary"
    }
    onClick = (e) => {
        e.preventDefault();
        this.setState({
            section: e.target.name
        })
    }
    componentDidMount() {
        if (this.props.projectId) {
            axios
                .get("/api/projects/" + this.props.projectId)
                .then((response) => {
                    console.log(response.data)
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }
    render() {
        return(
            <>
                <div className="btn-group">
                    <button onClick={this.onClick} name="summary" type="button" className="btn btn-primary">Summary</button>
                    <button onClick={this.onClick} name="tech" type="button" className="btn btn-primary">Technologies</button>
                    <button onClick={this.onClick} name="role" type="button" className="btn btn-primary">My Role</button>
                    <button onClick={this.onClick} name="links" type="button" className="btn btn-primary">Links</button>
                    <button onClick={this.onClick} name="images" type="button" className="btn btn-primary">Images</button>
                </div>
                {sections[this.state.section]}
                <button type="button" className="btn btn-primary float-right">Save</button>
            </>
        )
    }
}
export default Project;