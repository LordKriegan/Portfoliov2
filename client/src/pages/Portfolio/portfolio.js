import React, { Component } from 'react'
import { Card, DefaultLayout, ProjectModal } from '../../components';
import axios from 'axios';
import Modal from 'react-modal';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
const customStyles = {
    content: {
        backgroundColor: "rgba(0,0,0,0)",
        border: "none",
        // top: '25%',
        // left: '50%',
        // right: 'auto',
        // bottom: 'auto',
        // marginRight: '-50%',
        // transform: 'translate(-50%, -50%)'
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
                <Card title="About Me" titleClass="h1">
                    {(this.state.data)
                        ? <Carousel useKeyboardArrows={true} emulateTouch={true} showArrows={false}>
                            {this.state.data.map((elem, id) => {
                                return (
                                    <div style={{ cursor: "pointer" }} onClick={() => this.onClickHandler(elem)} key={id}>
                                        <p className="legend">{elem.title}</p>
                                        <img className="img-fluid" src={elem.Images[0].imageLink} alt={elem.title} />
                                    </div>
                                )
                            })}
                        </Carousel>
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