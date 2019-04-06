import React, { Component } from 'react'
import { Card, DefaultLayout, ProjectModal } from '../../components';
import axios from 'axios';
import Modal from 'react-modal';
const customStyles = {
    content: {
        backgroundColor: "rgba(0,0,0,0)",
        border: "none"
    }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

class Portfolio extends Component {

    state = {
        data: '',
        modalIsOpen: false,
        project: ''
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }


    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    componentDidMount() {
        axios
            .get("/api/projects/all")
            .then((response) => {

                this.setState({
                    data: response.data
                })
            })
            .catch((error) => console.error(error))
    }

    onClickHandler = (project) => {
        this.setState({
            project: project
        }, () => this.openModal())
    }
    render() {
        return (
            <DefaultLayout>
                <Card title="Portfolio" titleClass="h1">
                    {(this.state.data)
                        ? <div className="row">
                            <div className="col-12">
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    justifyContent: "center"
                                }}>
                                    {this.state.data.map((elem, i) => {
                                        return(
                                            <div onClick={() => this.onClickHandler(elem)} style={{
                                                border: "groove",
                                                position: "relative",
                                                margin: "5px",
                                                cursor: "pointer"
                                            }}>
                                                <img style={{
                                                    height: "240px",
                                                    width: "320px",
                                                    objectFit: "scale-down"
                                                }} className="img-fluid mx-auto d-block" src={elem.Images[0].imageLink} alt={elem.title} />
                                                <p style={{
                                                    backgroundColor: "rgba(0, 0, 0, 0.5",
                                                    color: "white",
                                                    bottom: "10px",
                                                    position: "absolute",
                                                    width: "100%"
                                                }} className="text-center">{elem.title}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        : <p>Loading data...</p>}
                </Card>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Project Modal"
                >
                    {(this.state.project)
                        ? <ProjectModal ref={subtitle => this.subtitle = subtitle} project={this.state.project} closeModal={this.closeModal} />
                        : <p>Something went wrong... somehow this modal was triggered without selecting a project!</p>}

                </Modal>
            </DefaultLayout>
        )
    }
}

export default Portfolio;