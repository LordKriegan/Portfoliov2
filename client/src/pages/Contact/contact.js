import React, { Component } from 'react'
import { Card, DefaultLayout, Alert } from '../../components';

class Contact extends Component {
    state = {
        name: "",
        email: "",
        message: "",
        phoneNum: ""
    }
    
    onChangeHandler = ({ target: { name, value }}) => {
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        this.dismissAlert();
        const { name, phoneNum, email, message } = this.state;
        if (!(name && message && (email || phoneNum))) {
            let missing = [];
            if (!name) missing.push("Name")
            if (!email) missing.push("E-mail")
            if (!phoneNum) missing.push("Phone Number")
            if (!message) missing.push("Message")
            const alertMessage = "Missing information: " + missing.join(", ")
            this.showAlert(alertMessage, "alert-danger");
            e.preventDefault()
        }
    }
    showAlert = (message, type) => {
        this.setState({
            alert: {
                message: message,
                type: type
            }
        }, () => setTimeout(this.dismissAlert, 3000))
    }
    dismissAlert = () => {
        this.setState({
            alert: ""
        })
    }
    
    render() {
        return (
            <DefaultLayout>
                <Card title="Contact Me" titleClass="h1">
                    <form onSubmit={this.handleSubmit} method="POST" action="https://formspree.io/qstationwala@gmail.com">
                        <div className="form-group">
                            <label htmlFor="userName">Name: </label>
                            <input onChange={this.onChangeHandler} name="name" value={this.state.name} type="text" className="form-control" id="userName" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="userEmail">Email address: </label>
                            <input onChange={this.onChangeHandler} name="email" value={this.state.email} type="email" className="form-control" id="userEmail" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="userPhone">Phone Number: </label>
                            <input onChange={this.onChangeHandler} name="phoneNum" value={this.state.phoneNum} type="text" className="form-control" id="userPhone" placeholder="Enter phone number" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="userMessage">Message: </label>
                            <textarea onChange={this.onChangeHandler} name="message" value={this.state.message} className="form-control" id="userMessage" rows="3"></textarea>
                        </div>
                        <div className="btn-group float-right" role="group">
                            <button type="submit" className="btn btn-default">Submit</button>
                            <button onClick={this.handleClear} type="button" className="btn btn-primary">Clear</button>
                        </div>
                        <input type="hidden" name="_next" value="/home"/>
                    </form>
                </Card>
                {(this.state.alert)
                 ? <Alert dismissAlert={this.dismissAlert} message={this.state.alert.message} alertType={this.state.alert.type} />
                 : ""}
            </DefaultLayout>
        )
    }
}

export default Contact;