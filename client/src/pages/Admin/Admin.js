import React, { Component } from 'react';
import { LayoutNoSidebar, LoginForm, AdminConsole } from '../../components';
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
                    sessionStorage.setItem("loggedIn", "true")
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
                {(this.state.loggedIn || (sessionStorage.getItem("loggedIn") === "true")) ? <AdminConsole /> : <LoginForm login={this.login} />}
            </LayoutNoSidebar>
        )
    }
}

export default Admin;