const initialState = {
    name: [],
    amount: [],
    time:[],
    noExpense:true
}
export default function(state = initialState, action){
    switch (action.type) {
        case 'MAKE_TODAYS_GRAPH':
            if(!action.payload.message){
                const data =action.payload.expenses 
                let expenseName = [];
                let expenseAmount = [];
                let expenseTime = [];
                data.map(function name(expense){
                    expenseName = [...expenseName, expense.expenseName];
                    expenseAmount = [...expenseAmount,expense.expensePrice];
                    expenseTime = [...expenseTime,expense.time]
                    return null
                })
                return {
                    ...state,
                    noExpense:false,
                    name: expenseName,
                    amount: expenseAmount,
                    time: expenseTime
                }
            }
            break
        case 'LOGOUT_USER':
            return{
                name: [],
                amount: [],
                time:[],
                noExpense:true
            }
        default:
            return state
    }
}