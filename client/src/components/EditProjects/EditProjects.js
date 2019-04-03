import React, { Component } from 'react';
import { ProjectList, Project } from './components';
import { MdClear } from 'react-icons/md';
import axios from 'axios';
import Modal from 'react-modal';

const FILESTACKAPIKEY = "A1HD3At9LTJ6SPmsQpgBaz";
const customStyles = {
    content: {
        top: '25%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'black'
    }
};
Modal.setAppElement("#root");
class EditProjects extends Component {
    state = {
        backgroundColor: '#151515',
        projectList: '',
        projectId: '',
        modalIsOpen: false
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
        }, () =>{
            if (this.state.projectId) this.openModal()
        })
    }
    render() {
        return (
            <>
            {
                (this.state.projectList)
                    ? <ProjectList name="projectId" onChange={this.onChange} projectList={this.state.projectList} />
                    : <p>Loading Data...</p>
            }
            <button type="button" className="btn btn-primary float-right">Add New Project...</button>
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Edit Project Modal"
            >
                <h2 ref={subtitle => this.subtitle = subtitle}>Edit Project <button className="float-right btn btn-primary" style={{borderRadius: "50%"}} onClick={this.closeModal}><MdClear /></button></h2>
                
                <Project projectId={this.state.projectId} />
            </Modal>
            </>
        )
    }

}

export default EditProjects;