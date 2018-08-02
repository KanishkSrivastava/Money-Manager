const Joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        return(req, res, next) =>{
            const result = Joi.validate(req.body, schema);
            if(result.error){
                return res.status(400).json({
                    error: result.error
                })
            }
            if(!req.value){req.value = {}}
            req.value['body'] = result.value;
            next();
        }
    },
    schemas:{
        signUpSchema: Joi.object().keys({
            firstName:Joi.string(),
            lastName:Joi.string(),
            email: Joi.string().email().required(),
            password: Joi.string().min(4).max(15).required(),
            password_confirmation: Joi.any().valid(Joi.ref('password')).required()
        }),
        loginSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().min(4).max(15).required(),
        }),
        expensesSchema: Joi.object().keys({
            expenseName:Joi.string().required(),
            expensePrice: Joi.number().positive().required(),
            date: Joi.string().required(),
            time: Joi.string().required()
        })
    }
}
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJNb25leSBNYW5hZ2VyIiwic3ViIjoiNWFkMmY5YjRlM2RjZTgxMGY0MTI0ZDViIiwiaWF0IjoxNTIzNzc1OTI0NzMxLCJleHAiOjE1MjM4NjIzMjQ3MzF9.5q2TH8K3pOEWxlemj7L5Jwpo8XnJKdJ0CBpMlUN07FI