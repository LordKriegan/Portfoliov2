import React, { Component } from 'react';
import axios from 'axios';
import { MdClear } from 'react-icons/md';


class Project extends Component {

    renderEditor = (section) => {
        switch (section) {
            case "title":
                return (<input style={{ width: "100%" }} name="title" value={this.state.title} onChange={this.onChange} />)
            case "summary":
                return (<textarea style={{ width: "100%" }} onChange={this.onChange} name="summary" value={this.state.summary} rows="3"></textarea>)
            case "tech":
                return (<div className="text-center">
                    {this.state.tech.map((elem, i) => {
                        return <span key={i}><span><button onClick={() => this.removeTech(i)} style={{ borderRadius: "50%" }} class="btn btn-primary"><MdClear /></button>{elem}</span></span>
                    })}
                    <div className="input-group mb-3">
                        <input name="newTech" value={this.state.newTech} onChange={this.onChange} type="text" className="form-control" placeholder="Add new tech" />
                        <div className="input-group-append">
                            <button onClick={this.addTech} className="btn btn-primary" type="button">Add Tech</button>
                        </div>
                    </div>
                </div>)
            case "role":
                return (<textarea rows="3" style={{ width: "100%" }} name="role" value={this.state.role} onChange={this.onChange}></textarea>)
            case "links":
                return (<>
                    <div className="form-group row">
                        <label className="col-2" htmlFor="github link">Github Link</label>
                        <div className="col-10">
                            <input style={{ width: "100%" }} name="ghLink" value={this.state.ghLink} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-2" htmlFor="Live link">Live Link</label>
                        <div className="col-10">
                            <input style={{ width: "100%" }} name="liveLink" value={this.state.liveLink} onChange={this.onChange} />
                        </div>
                    </div>
                </>)
            case "images":
                return (<p>images edit placeholder</p>)
            default:
                return null
        }
    }
    removeTech = (i) => {
        let techArr = this.state.tech.slice();
        techArr.splice(i, 1);
        this.setState({
            tech: techArr
        })
    }
    addTech = () => {
        let techArr = this.state.tech.slice();
        techArr.push(this.state.newTech)
        this.setState({
            tech: techArr
        })
    }
    onChange = (e) => {
        const { target: { name, value } } = e;
        this.setState({
            [name]: value
        })
    }
    state = {
        section: "summary",
        summary: "",
        title: "",
        tech: "",
        newTech: "",
        role: "",
        ghLink: "",
        liveLink: "",
        images: ""
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
                    this.setState({
                        summary: response.data[0].summary,
                        role: response.data[0].role,
                        title: response.data[0].title,
                        tech: response.data[0].tech.split(","),
                        ghLink: response.data[0].ghLink,
                        liveLink: response.data[0].liveLink,
                        images: response.data[0].Images
                    })
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }
    render() {
        return (
            <>
            <div className="row">
                <div className="col-12">
                    <div className="btn-group">
                        <button onClick={this.onClick} name="title" type="button" className="btn btn-primary">Title</button>
                        <button onClick={this.onClick} name="summary" type="button" className="btn btn-primary">Summary</button>
                        <button onClick={this.onClick} name="tech" type="button" className="btn btn-primary">Technologies</button>
                        <button onClick={this.onClick} name="role" type="button" className="btn btn-primary">My Role</button>
                        <button onClick={this.onClick} name="links" type="button" className="btn btn-primary">Links</button>
                        <button onClick={this.onClick} name="images" type="button" className="btn btn-primary">Images</button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    {/* {this.sections[this.state.section]} */}
                    {this.renderEditor(this.state.section)}
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <button type="button" className="btn btn-primary float-right">Save</button>
                </div>
            </div>
            </>
        )
    }
}
export default Project;