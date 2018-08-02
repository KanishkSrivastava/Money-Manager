import axios from 'axios';
import jwtDecode from 'jwt-decode'; 
import setAuthToken from '../utils/setAuthToken'
export const actionSignUp = (newUser, history) => dispatch => {
    axios
    .post('/auth/signup', newUser)
    .then(res => {
        history.push('/login')
    })
    .catch(err =>{ 
        dispatch({
            type: 'SIGNUP_ERRORS',
            payload:err.response.data
        })
    })
}

export const actionLogin = newUser => dispatch => {
    dispatch({
        type: 'LOADING',
    })
    axios
    .post('/auth/login', newUser)
    .then(res => {
        const token = res.data.token
        localStorage.setItem('jwtToken', token)
        setAuthToken(token)
        const userDecoded = jwtDecode(token)
        dispatch(setCurrentUser(userDecoded))
    })
    .catch(err =>{
        dispatch({
            type: 'DONE_LOADING',
        })
        dispatch({
            type: 'LOGIN_ERRORS',
            payload:err.response.data
        })
    })
}
export const setCurrentUser = userDecoded => {
    return {
        type:'SET_USER',
        payload: userDecoded
    }
}
export const actionLogout  = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false)
    dispatch(setCurrentUser({}))
    dispatch({
        type:'LOGOUT_USER'
    })
}
export const actionPostExpenses = (expense) => dispatch => {
    const token = localStorage.jwtToken 
    setAuthToken(token);
    dispatch({
        type:'LOADING_POSTING_EXPENSES'
    })
    axios
    .post('./expenses',expense)
    .then( res => {
        dispatch({
            type:"EXPENSES_SUCCESS"
        })
    })
    .catch(err => {
        dispatch({
            type: 'EXPENSES_ERROR',
            payload:err.response.data
        })
    })
}
export const actionGetExpenses = (date) => dispatch => {
    const token = localStorage.jwtToken
    setAuthToken(token);
    axios
    .get(`/expenses/${date}`)
    .then( res => {        
        dispatch({
            type: 'MAKE_TODAYS_GRAPH',
            payload: res.data
        })
    })
    .catch(err => {
        console.log(err);
    })
}
export const actionGetAllDates = (data) => dispatch => {
    const token = localStorage.jwtToken
    setAuthToken(token);
    axios
    .get('/expenses/getExpenseByDate')
    .then( res => {
        dispatch({
            type: 'GET_EXPENSES_DATE',
            payload: res.data
        })
    })
    .catch( err => {
        console.log(err);
    })
}
export const actionGetAllDatesExpense = (date) => dispatch => {
    const token = localStorage.jwtToken
    setAuthToken(token);
    axios
    .get(`/expenses/${date}`)
    .then( res => {
        dispatch({
            type: 'GET_DATE_DATA',
            payload: res.data
        })
    })
    .catch(err => {
        console.log(err);
    })
}
export const actionDeleteExpense = (id) => dispatch => {
    console.log(id);
    const token = localStorage.jwtToken
    setAuthToken(token);
    axios
    .get(`expenses/delete/${id}`)
    .then(res => {
        console.log(res);
        dispatch({
            type:'DELETE_EXPENSES'
        })
    })
}