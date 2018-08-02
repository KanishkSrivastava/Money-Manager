const initialState = {
    alreadyUsed: false,
    fname: false,
    lname: false,
    emailEmpty: false,
    emailInvalid: false,
    passwordEmpty: false,
    passwordShort: false,
    conPasswordNotMactch: false 
}
export default function(state = initialState, action){
    switch(action.type){
        case 'SIGNUP_ERRORS':
            const err = action.payload
            if(err.message === "Email already in use"){
                return {
                    ...state,
                    alreadyUsed: 'Email already used',
                    fname: false,
                    lname: false,
                    emailEmpty: false,
                    emailInvalid: false,
                    passwordEmpty: false,
                    passwordShort: false,
                    conPasswordNotMactch: false 
                }
            }
            if(err.error.details[0].message=== "\"firstName\" is not allowed to be empty"){
                return {
                    ...state,
                    fname: 'Firstname is empty'
                }
            }
            if(err.error.details[0].message=== "\"lastName\" is not allowed to be empty"){
                return {
                    ...state,
                    fname: false,
                    lname:'Lastname is empty'
                }
            }
            if(err.error.details[0].message === "\"email\" is not allowed to be empty"){
                return {
                    ...state,
                    fname: false,
                    lname: false,
                    emailEmpty: 'Email is Empty'
                }
            }
            if(err.error.details[0].message === "\"email\" must be a valid email"){
                return {
                    ...state,
                    fname: false,
                    lname: false,
                    emailEmpty: false,
                    emailInvalid: 'Email is not valid'
                }
            }
            if(err.error.details[0].message === "\"password\" is not allowed to be empty"){
                return {
                    ...state,
                    fname: false,
                    lname: false,
                    emailEmpty: false,
                    emailInvalid: false,
                    passwordEmpty: 'password is empty'
                }
            }
            if(err.error.details[0].message === "\"password\" length must be at least 4 characters long"){
                return {
                    ...state,
                    fname: false,
                    lname: false,
                    emailEmpty: false,
                    emailInvalid: false,
                    passwordEmpty: false,
                    passwordShort: 'Password is short'
                }
            }
            if(err.error.details[0].message === "\"password_confirmation\" must be one of [ref:password]"){
                return {
                    ...state,
                    fname: false,
                    lname: false,
                    emailEmpty: false,
                    emailInvalid: false,
                    passwordEmpty: false,
                    passwordShort: false,
                    conPasswordNotMactch: 'confirmation password is not matching' 
                }
            }
        return initialState;
        default:
        return initialState;
    }
}
