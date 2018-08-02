import React, { Component } from 'react';
    
import { connect } from 'react-redux';

class LandingPage extends Component {
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/home')
        }
    }
    render() {
        return (
            <div>
                <h1>LANDING PAGE</h1>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}
export default connect(mapStateToProps, null) (LandingPage);