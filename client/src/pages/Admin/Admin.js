import React, { Component } from 'react';
import { LayoutNoSidebar, LoginForm, EditProjects } from '../../components';
import axios from 'axios';

class Admin extends Component {
    state = {
        loggedIn: false
    }
    login = (user, pass) => {
        axios
            .post("/api/login", {
                user: user,
                password: pass
            })
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        loggedIn: true
                    })
                } else {
                    console.log("Wrong password!")
                }
            }).catch((error) => {
                console.error(error)
            })
    }
    render() {
        return(
            <LayoutNoSidebar>
                {(this.state.loggedIn) ? <EditProjects /> : <LoginForm login={this.login} />}
            </LayoutNoSidebar>
        )
    }
}

export default Admin;