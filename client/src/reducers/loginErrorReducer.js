const initialState = {
    emailEmpty: false,
    emailInvalid: false,
    passwordEmpty: false,
    passwordInvalid: false,
    invalidUser: false,
}
export default function(state = initialState, action){
    switch(action.type){
        case 'LOGIN_ERRORS':
            const err = action.payload;
            if(err.message === "Email-ID or Password not found"){
                return{
                    ...state,
                    invalidUser: 'User Invalid',
                    emailEmpty: false,
                    emailInvalid: false,
                    passwordEmpty: false,
                    passwordInvalid: false
                }
            }
            if(err.error.details[0].message === "\"email\" is not allowed to be empty"){
                return{
                    ...state,
                    emailEmpty: 'Empty email',
                }
            }
            if(err.error.details[0].message === "\"email\" must be a valid email"){   
                return{
                    ...state,
                    emailEmpty: false,
                    emailInvalid: 'Invalid Email',
                }
            }
            if(err.error.details[0].message === "\"password\" is not allowed to be empty"){
                return{
                    ...state,
                    emailEmpty: false,
                    emailInvalid: false,
                    passwordEmpty: 'Empty Password'
                }
            }
            if(err.error.details[0].message === "\"password\" length must be at least 4 characters long"){
                return{
                    ...state,
                    emailEmpty: false,
                    emailInvalid: false,
                    passwordEmpty: false,
                    passwordInvalid: 'Invalid Password'
                }
            }
        break;
        default:
        return initialState;
    }   
}