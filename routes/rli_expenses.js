const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConf   = require('../config/passport');
const { validateBody, schemas } = require('../config/validation');

const mongoose = require('mongoose');
const expenses = mongoose.model('expenses');

router.post('/', passport.authenticate('jwt', {session:false}), validateBody(schemas.expensesSchema), async(req, res, next) => {
    const newExpense = await new expenses ({
        user: req.user.id,
        expenseName: req.value.body.expenseName,
        expensePrice: req.value.body.expensePrice,
        date: req.value.body.date,
        time: req.value.body.time,
    });
    await newExpense.save();
    res.status(200).json({
        newExpense: newExpense
    })
})
router.get('/', passport.authenticate('jwt', {session:false}), async (req, res, next) => {
    const allExpenses = await expenses.find({user:req.user.id}).sort({date: 1,time: 1}).exec();
    if (allExpenses.length == 0){
        res.json({
            message:"no expenses"
        })
        return;
    }
    res.json({
        expenses: allExpenses
    })
})
router.get('/getExpenseByDate', passport.authenticate('jwt', {session:false}), async (req, res, next) => {
    await expenses.find({user:req.user.id}).distinct('date', (error, date) => {
        res.json({
            expenses: date
        })
    });
})
router.get('/:date', passport.authenticate('jwt', {session:false}), async (req, res, next) => {
    const expenseDate = await expenses.find({user:req.user.id,date:req.params.date}).sort({time: 1}).exec();
    if(expenseDate.length == 0){
        res.json({
            message:"no expenses"
        })
        return;
    }
    res.json({
        expenses: expenseDate
    })
    console.log(req.params.date);
    
})

router.get('/delete/:id', passport.authenticate('jwt', {session:false}), async (req, res, next) => {
    console.log(req.params);
    await expenses.findById(req.params.id).remove();
    res.json({
        message: "expense removed",
        id: req.params.id
    })
    
})

module.exports = router;