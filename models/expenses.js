const mongoose = require('mongoose');
const Schema = mongoose.Schema;
   
const expensesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    date: String,
    time: String,
    expenseName:String,
    expensePrice:Number
})
mongoose.model('expenses', expensesSchema)