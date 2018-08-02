import React, { Component } from 'react';
import classNames from 'classnames';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { actionSignUp } from '../actions/index';
class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            fName:'',
            lName:'',
            email:'',
            password:'',
            confirmPassword:'',
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    onInputChange(e){    
        this.setState({
          [e.target.name]:e.target.value
        })
    }
    onFormSubmit(e){
        e.preventDefault();
        const newUser = {
            firstName: this.state.fName,
            lastName: this.state.lName,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.confirmPassword
        }
        this.props.actionSignUp(newUser,this.props.history)
    }
    render() {        
        return (            
            <div className = "container">
                <div className="row margin-top">
                    <form onSubmit = {this.onFormSubmit} className="col s6 offset-s3">
                        <div className="row">
                            <div className="input-field col s6">
                                <i className="material-icons prefix">chevron_right</i>
                                <input className = {classNames({'invalid': this.props.err.fname})} id="first_name" name = "fName" onChange = {this.onInputChange} type ="text" value = {this.state.fName}/>
                                <label htmlFor="first_name">First Name</label>
                                <span className = "helper-text" data-error="firstname cannot be null"></span>
                            </div>
                            <div className="input-field col s6">
                                <i className="material-icons prefix">chevron_right</i>
                                <input id="last_name" className = {classNames({'invalid': this.props.err.lname})} name = "lName" type = "text" onChange = {this.onInputChange} value = {this.state.lName}/>
                                <label htmlFor="last_name">Last Name</label>
                                <span className = "helper-text" data-error="lastname cannot be null"></span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6 offset-s3">
                                <i className="material-icons prefix">chevron_right</i>
                                <input id="e-mail" className = {classNames({'invalid': this.props.err.emailEmpty || this.props.err.emailInvalid})} type = "text" name = "email" onChange = {this.onInputChange} value = {this.state.email}/>
                                <label htmlFor = "e-mail">E-Mail</label>
                                <span className = "helper-text" data-error="provide a valid email."></span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6 offset-s3">
                                <i className="material-icons prefix">chevron_right</i>
                                <input id="password" className = {classNames({'invalid': this.props.err.passwordEmpty})} name = "password" type = "password" onChange = {this.onInputChange} value = {this.state.password}/>
                                <label htmlFor="password">Password</label>
                                <span className = "helper-text" data-error="atleast 4 characters"></span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6 offset-s3">
                                <i className="material-icons prefix">chevron_right</i>
                                <input id="confirm_password" className = {classNames({'invalid': this.props.err.conPasswordNotMactch})} name = "confirmPassword" type = "password" onChange = {this.onInputChange} value = {this.state.confirmPassword}/>
                                <label htmlFor="confirm_password">Confirm Password</label>
                                <span className = "helper-text" data-error="password does not match"></span>
                            </div>
                        </div>
                        <div className="row">
                            <button className="btn waves-effect waves-light col s4 offset-s8" type="submit" name="action">Submit
                                <i className="material-icons right">send</i>
                            </button>
                        </div>
                        <div className = "row">
                            <div className = {classNames ({
                                'col': true,
                                's6': true,
                                'offset-s8': true,
                                'red-text text-darken-3': true,
                                'hide': !this.props.err.alreadyUsed
                            })}>
                                Email is already registered. 
                            </div>
                        </div>
                    </form>
                </div>   
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        err: state.err
    }
}
export default connect(mapStateToProps, { actionSignUp }) (withRouter(SignUp));