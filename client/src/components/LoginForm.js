import React, { Component } from 'react';

class LoginForm extends Component {
    state = {
        username: "",
        password: ""
    }

    onChangeHandler = (e) => {
        const { target: { name, value } } = e;
        this.setState({
            [name]: value
        })
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password)
    }
    render() {
        return (
            <div className="row">
                <div className="col-sm-4 offset-sm-4">
                    <form>
                        <div class="form-group">
                            <label for="userName">User Name</label>
                            <input name="username" onChange={this.onChangeHandler} value={this.state.username} type="email" class="form-control" id="userName" aria-describedby="Username" placeholder="Username" />
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input name="password" onChange={this.onChangeHandler} value={this.state.password} type="password" class="form-control" id="password" placeholder="Password" />
                        </div>
                        <button onClick={this.submitHandler} type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default LoginForm;