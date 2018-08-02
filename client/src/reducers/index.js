import { combineReducers } from "redux";
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import loginErrorReducer from './loginErrorReducer';
import expensesReducer from './expensesReducer';
import todaysGraphReducer from './todaysGraphReducer';
import allExpensesReducer from './allExpenses';
export default combineReducers({
    auth:authReducer,
    err:errorReducer,
    errLogin:loginErrorReducer,
    expenses: expensesReducer,
    todaysGraphData: todaysGraphReducer,
    allExpenses: allExpensesReducer
});