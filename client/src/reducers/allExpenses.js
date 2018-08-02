import arraySort from 'array-sort';

const initialState = {
    date:[],
    name:[],
    price:[],
    time:[],
    id:[]
}

export default function(state = initialState, action){    
    switch(action.type){
        case 'GET_EXPENSES_DATE':
        const date = arraySort(action.payload.expenses)
            return{
                ...state,
                date: date
            }
        case 'LOGOUT_USER': return initialState
        case 'GET_DATE_DATA':
            if(action.payload.message === 'no expenses')return {...state,name:[],price:[],time:[],id:[]}
            const allData = action.payload.expenses
            let name = []
            let time = []
            let price = []
            let id = []
            allData.map(Data => {
                id = [...id,Data._id]
                name = [...name, Data.expenseName]
                price = [...price, Data.expensePrice]
                time = [...time, Data.time]
            })                    
            return{
                ...state,
                name:name,
                time:time,
                price:price,
                id:id
            }
        default:
            return state
    }
}
