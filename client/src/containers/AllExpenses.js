import React, { Component } from 'react';
// import M from "materialize-css/dist/js/materialize.min.js"
import { connect } from 'react-redux';
// import classNames from 'classnames';
import {actionGetAllDates, actionGetAllDatesExpense, actionDeleteExpense} from '../actions/index';
import DATE from '../utils/setTodaysDate';
import {Bar} from 'react-chartjs-2';

class AllExpenses extends Component {
    constructor(props) {
        super(props);
        this.showDate = this.showDate.bind(this);
        this.onDateClick = this.onDateClick.bind(this);
        this.state = {
            date:[],
            chartData:{},
            selsectedDate:DATE
        }
    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated === false){
            this.props.history.push('/')
        }
        this.props.actionGetAllDates()
        
        this.props.actionGetAllDatesExpense(DATE)
        this.handleDelete = this.handleDelete.bind(this)
    }
    componentWillReceiveProps(nextProps){        
        this.setState({
            date: nextProps.allExpenses.date
        })
        this.setState({
            chartData :{
                labels: nextProps.allExpenses.time,
                datasets:[
                    {
                        label:this.state.selsectedDate,
                        data:nextProps.allExpenses.price,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        name:nextProps.allExpenses.name
                    }
                ]
            }   
        })
    }    
    showDate(date){
        return <a key = {date} className="pointer collection-item" onClick = {e => this.onDateClick(date,e)}>{date}</a>
    }
    onDateClick(date,e){
        this.setState({
            selsectedDate:date
        })
        this.props.actionGetAllDatesExpense(date)       
    }
    handleDelete(id){
        this.props.actionDeleteExpense(id);
        window.location.reload()  
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s2">
                        <div className="collection margin-top">
                            {this.state.date.map(date => {
                                return this.showDate(date)
                            })}
                            </div>
                    </div>
                    <div className="col s5">
                        {(() => {                            
                            if(this.props.allExpenses.id.length !== 0 ){                                
                                return(
                                    <Bar data = {this.state.chartData}
                                        options = {
                                            {
                                                scales: {
                                                    yAxes: [{
                                                        ticks: {
                                                            beginAtZero: true
                                                        },
                                                        scaleLabel: {
                                                            display: true,
                                                            labelString: 'MONEY ->'
                                                        }
                                                    }],
                                                    xAxes: [{
                                                        gridLines: {
                                                            offsetGridLines: true
                                                        },
                                                        scaleLabel: {
                                                            display: true,
                                                            labelString: 'TIME ->'
                                                        },
                                                        categorySpacing: 0
                                                    }]
                                                },
                                                tooltips: {
                                                    mode: 'label',
                                                    callbacks: {
                                                    label: (t, d) => {
                                                        let name = (d.datasets[0].name[t.index]);
                                                        return name;
                                                    }
                                                    }
                                                }
                                            }
                                        }
                                    />
                                )
                            }else return <div className = "col s5 right"><h5>Select a date</h5></div>
                        })()}
                    </div>
                    <div className="col s5">
                    {(()=>{
                        if(this.props.allExpenses.id.length !== 0 ){
                            let prices = this.props.allExpenses.price
                            let names = this.props.allExpenses.name
                            let times = this.props.allExpenses.time
                            let ids = this.props.allExpenses.id
                            return names.map((name,index) => {
                                return(
                                    <div key = {ids[index]} className = "col s6">
                                        <div className="card horizontal blue-grey lighten-4">
                                            <div className="card-stacked">
                                                <div className="card-content">
                                                    <p><strong>Expense:</strong> {name} <span className = "right"><strong>Time:</strong> {times[index]}</span></p>
                                                    <p><strong>Price:</strong> {prices[index]}</p>
                                                </div>
                                                <div className="card-action">
                                                    <div key = {ids[index]} onClick = {e => this.handleDelete(ids[index],e)} className = "pointer right red-text lighten-2">Delete</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )    
                            })
                        }else return <div></div>
                    })()}
                    </div>
                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        allExpenses:state.allExpenses,
    }
}
export default connect(mapStateToProps, {actionGetAllDates, actionGetAllDatesExpense, actionDeleteExpense}) (AllExpenses);