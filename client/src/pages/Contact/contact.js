import React, { Component } from 'react'
import { Card, DefaultLayout, Alert } from '../../components';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";

class Contact extends Component {
    state = {
        email: "",
        phoneNum: "",
        message: "",
        name: "",
        alert: ""
    }

    onChangeHandler = ({ target: { name, value } }) => {
        this.setState({
            [name]: value
        });
    }
    handleClear = (e) => {
        if (e) e.preventDefault();
        this.setState({
            email: "",
            phoneNum: "",
            message: "",
            name: "",
            error: "",
            recaptcha: false
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.dismissAlert();
        if (!this.state.recaptcha) {
            this.showAlert("Please make sure the reCaptcha has been filled out.", "alert-danger");
            return;
        }
        const { name, phoneNum, email, message } = this.state;
        if (name && message && (email || phoneNum)) {
            axios
                .post("/api/contact", {
                    name,
                    email,
                    phoneNum,
                    message
                })
                .then((response) => {
                    console.log(response);
                    this.handleClear();
                    this.showAlert("Your message has been sent! I will get back to you asap.", "alert-success");
                })
                .catch((error) => {
                    this.showAlert(error.message, "alert-danger");
                })

        } else {
            let missing = [];
            if (!name) missing.push("Name")
            if (!email) missing.push("E-mail")
            if (!phoneNum) missing.push("Phone Number")
            if (!message) missing.push("Message")
            const alertMessage = "Missing information: " + missing.join(", ")
            this.showAlert(alertMessage, "alert-danger");
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
    verifyCallback = (recaptchaToken) => {
        
        axios
            .post("/api/contact/verifyCaptcha", {
                token: recaptchaToken
            })
            .then((response) => {
                
                this.setState({
                    recaptcha: response.data.success
                })
            })
            .catch((error) => {
                this.showAlert("Error while trying to resolve reCaptcha\n" + error.message, "alert-danger");
            })
    }
    render() {
        return (
            <DefaultLayout>
                <Card title="Contact Me" titleClass="h1">
                    <form>
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
                            <button onClick={this.handleSubmit} type="submit" className="btn btn-default">Submit</button>
                            <button onClick={this.handleClear} type="button" className="btn btn-primary">Clear</button>
                        </div>
                        <ReCAPTCHA
                            sitekey="6LdXOpoUAAAAANM_AT_qu3MueFSBclsrUx9FecW7"
                            onChange={this.verifyCallback}
                        />
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