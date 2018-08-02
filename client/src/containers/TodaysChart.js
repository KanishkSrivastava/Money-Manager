import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Bar} from 'react-chartjs-2';
import DATE from '../utils/setTodaysDate';
class TodaysChart extends Component {
    constructor() {
        super();
        this.state = {
            chartData: {}
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            chartData :{
                labels: nextProps.data.time,
                datasets:[
                    {
                        label:DATE,
                        data:nextProps.data.amount,
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
                        name:nextProps.data.name
                    }
                    
                ]
            }   
        })
    }
    render() {
        if(this.props.data.noExpense){
            return(
                <div>
                    <h5>Add an expense to see today's graph</h5>    
                </div>
            )
        }else{
            return (
                <div>
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
                        
                    } />
                </div>    
            );
    
        }
    }
}   
const mapStateToProps = (state) => {
    return {
        data: state.todaysGraphData
    }
}
export default connect(mapStateToProps,null) (TodaysChart);