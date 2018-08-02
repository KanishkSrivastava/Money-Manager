import React, { Component } from 'react';
import M from "materialize-css/dist/js/materialize.min.js"
import { connect } from 'react-redux';
import { actionPostExpenses, actionGetExpenses } from '../actions/index';
import classNames from 'classnames';
import convertTime from 'convert-time';
import DATE from '../utils/setTodaysDate';
import TodaysChart from './TodaysChart';
import {Link} from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.handleOnIconClick = this.handleOnIconClick.bind(this);
    }
    componentWillReceiveProps(nextProps){
        this.props.actionGetExpenses(DATE);
    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated === false){
            this.props.history.push('/')
        }
        let date = document.querySelector('.datepicker',{
            setDefaultDate: true
        });
        M.Datepicker.init(date)
        let time = document.querySelector('.timepicker',{
            twelveHour: 'false'
        });
        M.Timepicker.init(time);
        this.props.actionGetExpenses(DATE);
    }
    handleOnIconClick(){
        const expenseName = this.refs.expenseName.value
        const amount = this.refs.amount.value
        const date = this.refs.date.value
        const time = convertTime(this.refs.time.value)        
        const expense = {
            expenseName: expenseName,
            expensePrice: amount,
            date: date,
            time: time
        }
        this.props.actionPostExpenses(expense)
        //TODO- BUGS
        if(this.props.err.success){
            this.refs.expenseName.value = ""
            this.refs.amount.value = ""
            this.refs.date.value = ""
            this.refs.time.value = ""
        }
    }
    render() {
        return (
            <div>
                <div className={classNames({'progress red lighten-2': this.props.err.loading})}>
                        <div className="indeterminate white"></div>
                </div>
                <div className = "container">
                    <div className="row">
                        <div className="col s4">
                            <div className="row">
                                <h4 className="header">Your Groups</h4>
                                <div className="card horizontal blue-grey lighten-4">
                                    <div className="card-stacked">
                                        <div className="card-content">
                                            <p>I am a very simple card. I am good at containing small bits of information.</p>
                                        </div>
                                        <div className="card-action red lighten-2">
                                            <Link to ="/groups" className = "white-text"href="">Groups</Link>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                            </div>
                            <div className="row">
                                <h4 className="header">View All Expenses</h4>
                                <div className="card horizontal blue-grey lighten-4">
                                    <div className="card-stacked">
                                        <div className="card-content">
                                            <p>Get all your previous spendings and their graphical representations.</p>
                                        </div>
                                        <div className="card-action red lighten-2">
                                            <Link to ="/allExpenses" className = "white-text">Get Expenses</Link>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                            </div>
                        </div>
                        <div className="col s7 offset-s1">
                        <h4 className="header"> About Today</h4>
                        <div className="row">
                            <div className="col s3">
                            <input className = {classNames({'invalid': this.props.err.expense})}ref = "expenseName" type="text" />
                            <label>Expense Name</label><br/>
                            </div>
                            <div className="col s3">
                                <input className =  {classNames({'invalid': this.props.err.amount})}ref = "amount" type="number" />
                                <label>Amount</label>
                            </div>
                            <div className="col s3">
                                <input className =  {classNames({
                                    'datepicker': true,
                                    'invalid': this.props.err.date})} ref = "date" type="text" id = "date"/>
                                <label >Date</label>
                            </div>
                            <div className="col s3">
                                <input className =  {classNames({
                                    'timepicker':true,
                                    'invalid': this.props.err.time})} ref = "time" type="text"/>
                                <label>Time</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className={classNames({'col s1 red-text': true, hide: this.props.err.success})}>
                                Empty fields
                            </div>
                            <div className="col s1 offset-s10">
                                <button onClick = {this.handleOnIconClick} className="btn-floating btn-large waves-effect waves-light red lighten-2"><i className="material-icons">add</i></button>
                            </div>
                            <div className="col s12">
                                <TodaysChart data2 = {this.props.auth}/>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        err: state.expenses
    }
}
export default connect(mapStateToProps, {actionPostExpenses, actionGetExpenses}) (Home);