import React, { Component } from 'react';
import { connect } from 'react-redux'

class Groups extends Component {
    componentDidMount(){
        if(this.props.auth.isAuthenticated === false){
            this.props.history.push('/')
        }
    }
    render() {
        return (
            <div className = "container">
                <div className="row">
                    <div className="col s3">
                        <h3>Groups</h3>
                    </div>
                    <div className="col s2">
                        <h3><button className="btn waves-effect waves-light" type="submit" name="action">Create Groups</button></h3>
                    </div>
                </div>
                {/* <div className="row">
                    <div className="col s2">
                        <h3><button className="btn waves-effect waves-light" type="submit" name="action">I O Them</button></h3>
                    </div>
                    <div className="col s2">
                        <h3><button className="btn waves-effect waves-light" type="submit" name="action">They O Me</button></h3>
                    </div>
                </div> */}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}

export default connect(mapStateToProps, null)(Groups)