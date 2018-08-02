const initialState = {
    expense: false,
    amount: false,
    date: false,
    time: false,
    success:true,
    loading: false
}
export default function (state = initialState, action){
    switch(action.type){
    case 'EXPENSES_ERROR':        
        const err = action.payload
        console.log(err.error.details["0"].message);

        if(err.error.details["0"].message === "\"expenseName\" is not allowed to be empty"){
            return{
                loading:false,
                success:false,
                expense: true,
                amount: false,
                date: false,
                time: false 
            }
        }
        if(err.error.details["0"].message === "\"expensePrice\" must be a number"){
            console.log(1);
            return{
                loading:false,
                success:false,
                expense: false,
                amount: true,
                date: false,
                time: false 
            }
        }
        if(err.error.details["0"].message === "\"date\" is not allowed to be empty"){
            return{
                loading:false,
                success:false,
                expense: false,
                amount: false,
                date: true,
                time: false 
            }
        }
        if(err.error.details["0"].message === "\"time\" is not allowed to be empty"){
            return{
                loading:false,
                success:false,
                expense: false,
                amount: true,
                date: false,
                time: true 
            }
        }
        break
        case 'EXPENSES_SUCCESS':
            return {
                loading:false,
                success: true,
            }
        case 'LOADING_POSTING_EXPENSES':
        return{
            ...initialState,
            loading: true
        }
    default:
    return state
    }
}