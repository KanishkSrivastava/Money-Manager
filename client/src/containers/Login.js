import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { actionLogin } from '../actions/index';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email:'',
            password:'',
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/home')
        }
    }
    onInputChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    async onFormSubmit(e){
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        this.setState({
            loader: true
        })
        this.props.actionLogin(user);
        this.setState({
            loader: true    
        })
    }
    render() {        
        return (
            <div >
                <div className={classNames({'progress red lighten-2': this.props.auth.loading})}>
                    <div className="indeterminate white"></div>
                </div>
                <div className = "container">
                    <div className="row margin-top">
                        <form onSubmit = {this.onFormSubmit} className="col s12 offset-s3">
                        <div className = "row">
                            <div className = {classNames ({
                                'col': true,
                                's6': true,
                                'red-text text-darken-3': true,
                                'hide': !this.props.errLogin.invalidUser
                            })}>
                                Wrong credential, please try again. 
                            </div>
                        </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <i className="material-icons prefix">chevron_right</i>
                                    <input className = {classNames({
                                        'invalid': this.props.errLogin.emailEmpty || this.props.errLogin.emailInvalid,
                                    })} onChange = {this.onInputChange} name = "email" id="first_name" type ="text"/>
                                    <label htmlFor="first_name">E-Mail</label>
                                    <span className = "helper-text" data-error="provide a valid email."></span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <i className="material-icons prefix">chevron_right</i>
                                    <input className = {classNames({
                                        'invalid': this.props.errLogin.passwordEmpty || this.props.errLogin.passwordInvalid,
                                    })} onChange = {this.onInputChange} name = "password" id="last_name" type = "password"/>
                                    <label htmlFor="last_name">Password</label>
                                    <span className = "helper-text" data-error="provide a valid password."></span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col offset-s4">
                                <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                                    <i className="material-icons right">send</i>
                                </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errLogin: state.errLogin
    }
}
export default connect(mapStateToProps, { actionLogin }) (Login);       