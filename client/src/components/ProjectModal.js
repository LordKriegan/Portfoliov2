import React, { Component } from 'react';
import { Card } from '.';
import { Carousel } from 'react-responsive-carousel';

import { FaExternalLinkAlt } from 'react-icons/fa'

class ProjectModal extends Component {

    state = {
        current: "summary"
    }
    changeInfo = (info) => {
        this.setState({
            current: info
        })
    }
    checkLink = (link) => {
        if (link.match(/^http[s]*:\/\/[\w]+/i)) return link
        else return "https://" + link
    }
    projInfo = {
        summary: <p>{this.props.project.summary}</p>,
        tech:   
            <ul style={{listStyleType: "none", margin: "0", padding: "0"}}>
                {this.props.project.tech.split(",").map((elem, i) => {
                    return(
                        <li key={i}>{elem}</li>
                    )
                })}
            </ul>,
        role: <p>{this.props.project.role}</p>,
        links: 
            <div>
                <p><a rel="noopener noreferrer" target="_blank" href={this.checkLink(this.props.project.liveLink)}>Live Link <FaExternalLinkAlt /></a></p>
                <p><a rel="noopener noreferrer" target="_blank" href={this.checkLink(this.props.project.ghLink)}>Github Link <FaExternalLinkAlt /></a></p>
            </div>
    }

    render() {
        return (
            <Card heightFix={{height: "100%"}} title={this.props.project.title} titleClass="h1">
                <div className="row">
                    <div className="col-12">
                        <Carousel useKeyboardArrows={true} emulateTouch={true} showArrows={false} showThumbs={false}>
                            {this.props.project.Images.map((elem, i) => {
                                return (
                                    <img key={i} style={{ height: "50vh", width: "auto" }} className="img-fluid" src={elem.imageLink} alt={this.props.project.title} />
                                )
                            })}
                        </Carousel>
                    </div>
                </div>

                <div className="row margTop">
                    <div className="col-12">
                        <div className="text-center">
                            <div className="btn-group">
                                <button type="button" className="btn btn-primary" onClick={() => this.changeInfo("summary")}>Summary</button>
                                <button type="button" className="btn btn-primary" onClick={() => this.changeInfo("tech")}>Technologies Use</button>
                                <button type="button" className="btn btn-primary" onClick={() => this.changeInfo("role")}>My Role</button>
                                <button type="button" className="btn btn-primary" onClick={() => this.changeInfo("links")}>Links</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row margTop">
                    <div className="col-12">
                        <div className="text-center">
                            {this.projInfo[this.state.current]}
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default ProjectModal;