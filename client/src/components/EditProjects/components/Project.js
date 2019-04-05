import React, { Component } from 'react';
import axios from 'axios';
import { MdClear } from 'react-icons/md';
import { ProjectImage } from './';
import ReactFilestack, { client } from 'filestack-react';
class Project extends Component {

    renderEditor = (section) => {
        switch (section) {
            case "title":
                return (<input style={{ width: "100%" }} name="title" value={this.state.title} onChange={this.onChange} />)
            case "summary":
                return (<textarea style={{ width: "100%" }} onChange={this.onChange} name="summary" value={this.state.summary} rows="3"></textarea>)
            case "tech":
                return (<div className="text-center" style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap"
                }}>
                    {(this.state.tech.length) ? this.state.tech.map((elem, i) => {
                        return <span style={{
                            border: "solid",
                            borderRadius: "10%",
                            borderWidth: "2px",
                            padding: "0 10px 0 10px",
                            margin: "5px"
                        }} key={i}><span><button onClick={() => this.removeTech(i)} style={{marginRight: "2px", borderRadius: "50%" }} className="btn btn-outline-danger"><MdClear /></button>{elem}</span></span>
                    }) : ""}
                    <div className="input-group mb-3">
                        <input onKeyUp={(e) => {if (e.keyCode === 13) this.addTech()}} name="newTech" value={this.state.newTech} onChange={this.onChange} type="text" className="form-control" placeholder="Add new tech" />
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
                return (<>
                    <div className="row">
                        <div className="col-12">
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                justifyContent: "center"
                            }}>
                                {(this.state.images.length) ? this.state.images.map((elem, i) => {
                                    return (
                                        <ProjectImage style={{ flex: "1 0 21%" }} key={i} image={elem} removeImg={() => this.removeImg(i)} />
                                    )
                                }) : ""}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <ReactFilestack
                                apikey="A1HD3At9LTJ6SPmsQpgBaz"
                                buttonText="Add Images"
                                buttonClass="btn btn-outline-secondary"
                                options={{
                                    accept: 'image/*',
                                    fromSources: ["local_file_system"],
                                    maxFiles: 20,
                                    storeTo: {
                                        location: 's3',
                                    },
                                }}
                                onSuccess={this.addImages}
                                preload={true}
                            />
                        </div>
                    </div>
                </>)
            default:
                return null
        }
    }
    addImages = (result) => {
        if (result.filesFailed.length) {
            console.error("Error while uplaoding files");
        } else {
            console.log(result)
            let imgArr = this.state.images.slice();
            let newImgs = result.filesUploaded.map((elem) => elem.url);
            this.setState({
                images: imgArr.concat(newImgs)
            });
        }
    }
    removeImg = (i) => {
        let imgArr = this.state.images.slice();
        imgArr.splice(i, 1);
        this.setState({
            images: imgArr
        })
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
                        <button onClick={this.saveProject} type="button" className="btn btn-primary float-right">Save</button>
                    </div>
                </div>
            </>
        )
    }
}
export default Project;