import React, {Component} from 'react';
import { EditProjects, WorkHistory, Education } from './'

class AdminConsole extends Component {
    enumedComps = {
        editProjects: <EditProjects />,
        workHistory: <WorkHistory />,
        education: <Education />
    }
    state = {
        section: "editProjects"
    }
    onClick = (e) => {
        e.preventDefault();
        console.log(e.target.name)
        this.setState({
            section: e.target.name
        }, () => console.log(this.state))
    }
    render() {
        return(<>
            {/*enter series of buttons for editing pages*/}
            <div className="row">
                <div className="col-12 text-center">
                    <div className="btn-group">
                        <button onClick={this.onClick} className="btn btn-primary" name="editProjects">Projects</button>
                        <button onClick={this.onClick} className="btn btn-primary" name="education">Education</button>
                        <button onClick={this.onClick} className="btn btn-primary" name="workHistory">Work History</button>                        
                    </div>
                </div>
            </div>
            {/*conditionally render component*/}
            <div className="row">
                <div className="col-12">
                    {this.enumedComps[this.state.section]}
                </div>
            </div>
            </>)  
    }
}

export default AdminConsole;