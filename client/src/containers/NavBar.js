import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import { connect } from 'react-redux';
import { actionLogout } from '../actions/index';


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this)
    }
    logout(){
        console.log(12);
        
        this.props.actionLogout()
        function deleteAllCookies() {
            var cookies = document.cookie.split(";");
        
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
        }
        deleteAllCookies()
    }
    render() {        
        if(this.props.auth.isAuthenticated){
            return(
                <div>
                    <nav>
                        <div className="nav-wrapper">
                            <Link to = "/" className="brand-logo">Money Manager</Link>
                            <ul id="nav-mobile" className="right">
                                <li>Hello {this.props.auth.user.firstName}</li>
                                <li onClick = {this.logout}><Link to = "/login" >Logout</Link></li>
                            </ul>
                        </div>
                    </nav>      
                </div>
            )
        }else{
            return (
                <div>
                    <nav>
                        <div className="nav-wrapper">
                            <Link to = "/" className="brand-logo">Money Manager</Link>
                            <ul id="nav-mobile" className="right">
                                <li><Link to = "/login" >Login In</Link></li>
                                <li><Link to = "/signup" >Sign Up</Link></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}
export default connect(mapStateToProps, {actionLogout}) (NavBar);