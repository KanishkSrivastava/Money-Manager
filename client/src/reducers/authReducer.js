const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
}
export default function(state = initialState, action){    
    switch(action.type){
        case 'LOADING':
            return{
                ...state,
                loading: true
            }
        case 'DONE_LOADING':
            return{
                ...state,
                loading: false
            }
        case 'SET_USER':
            if(Object.keys(action.payload).length === 0){
                return{
                    ...state,
                    isAuthenticated: false,
                    user: {},
                    loading: false
                }    
            }
            return{
                ...state,
                isAuthenticated: true,
                user: action.payload,
                loading: false
            }
        default:
        return state;
    }
}
