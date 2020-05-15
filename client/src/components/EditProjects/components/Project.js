import React, { Component } from 'react';
import axios from 'axios';
import { Input, Textarea, Techlist, Links, Images } from './';
class Project extends Component {

    renderEditor = (section) => {
        switch (section) {
            case "title":
                return (<Input name="title" value={this.state.title} onChange={this.onChange} />)
            case "summary":
                return (<Textarea onChange={this.onChange} name="summary" value={this.state.summary} />)
            case "tech":
                return (<Techlist tech={this.state.tech} newTech={this.state.newTech} onChange={this.onChange} addTech={this.addTech} removeTech={this.removeTech} />)
            case "role":
                return (<Textarea name="role" value={this.state.role} onChange={this.onChange} />)
            case "links":
                return <Links ghLink={this.state.ghLink} liveLink={this.state.liveLink} onChange={this.onChange} />
            case "images":
                return (<Images images={this.state.images} addImages={this.addImages} removeImg={this.removeImg} />)
            default:
                return null
        }
    }
    addImages = (images) => {
            let imgArr = this.state.images.slice();
            this.setState({
                images: imgArr.concat(images)
            }, console.log(this.state));
    }
    removeImg = (i) => {
        let imgArr = this.state.images.slice();
        // const oldImg = imgArr.splice(i, 1)[0];
        // console.log(oldImg);
        // const oldImgName = oldImg.split("\\").pop().split("/").pop();
        // axios
        //     .delete(`/api/bucket/delete?fileName=${oldImgName}`)
        //     .then((response) => {
        //         console.log(response)
        //         this.setState({
        //             images: imgArr
        //         });
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        imgArr.splice(i,1);
        this.setState({
            images: imgArr
        });
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
            tech: techArr,
            newTech: ""
        })
    }
    onChange = (e) => {
        const { target: { name, value } } = e;
        this.setState({
            [name]: value
        })
    }
    state = {
        projectId: "",
        section: "title",
        summary: "",
        title: "",
        tech: [],
        newTech: "",
        role: "",
        ghLink: "",
        liveLink: "",
        images: []
    }
    onClick = (e) => {
        e.preventDefault();
        this.setState({
            section: e.target.name
        })
    }

    componentDidMount() {
        if (this.props.projectId !== "new project") {
            this.setState({
                projectId: this.props.projectId
            }, () => this.loadProject())
        } else {
            this.setState({
                projectId: "new project"
            })
        }
    }
    componentDidUpdate(prevProps) {
        if ((this.props.projectId !== prevProps.projectId) && this.props.projectId !== "new project") {
            this.setState({
                projectId: this.props.projectId
            }, () => this.loadProject())
        } else if ((prevProps.projectId !== "new project") && (this.props.projectId === "new project")) {
            this.setState({
                projectId: "new project",
                section: "title",
                summary: "",
                title: "",
                tech: [],
                newTech: "",
                role: "",
                ghLink: "",
                liveLink: "",
                images: []
            })
        }
    }
    loadProject = () => {
        axios
            .get("/api/projects/" + this.state.projectId)
            .then((response) => {
                console.log(response.data)
                if (this.state.title !== response.data[0].title) {
                    this.setState({
                        summary: response.data[0].summary,
                        role: response.data[0].role,
                        title: response.data[0].title,
                        tech: response.data[0].tech.split(","),
                        ghLink: response.data[0].ghLink,
                        liveLink: response.data[0].liveLink,
                        images: response.data[0].Images.map((elem) => elem.imageLink)
                    })
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }
    deleteProject = () => {
        const { projectId } = this.state;
        
            axios
                .delete("/api/projects/" + projectId)
                .then((response) => {
                    window.location.reload();
                })
                .catch((error) => {
                    console.error(error)
                })
        
    }
    saveProject = () => {
        const { title, liveLink, ghLink, summary, tech, role, images, projectId } = this.state;
        if ((!title) ||
            (!liveLink) ||
            (!ghLink) ||
            (!summary) ||
            (!tech.length) ||
            (!role) ||
            (!images.length)) {
            console.error("missing data")
            return;
        } else {
            const newData = {
                title: title,
                liveLink: liveLink,
                ghLink: ghLink,
                summary: summary,
                tech: tech.join(','),
                role: role,
                images: images
            }
            console.log(newData)
            if (projectId === "new project") {
                axios
                    .post("/api/projects/", newData)
                    .then((response) => {
                        console.log(response.data);
                        window.location.reload();
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                axios
                    .put("/api/projects/" + projectId, newData)
                    .then((response) => {
                        console.log(response.data);
                        window.location.reload();
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
        }

    }
    render() {
        return (
            <>
            <div className="row">
                <div className="col-12 text-center">
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
                    <div className="btn-group float-right">
                        <button onClick={() => { if (window.confirm('Are you sure you wish to delete this project?')) this.deleteProject() } } type="button" className="btn btn-danger">Delete</button>
                        <button onClick={this.saveProject} type="button" className="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
            </>
        )
    }
}
export default Project;