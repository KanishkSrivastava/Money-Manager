const passport = require('passport');
const JWT_strategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');
const users = mongoose.model('users')

passport.use(new JWT_strategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: 'qwertyuiop'
},async (payload, done) =>{
    const user = await users.findById(payload.id);
    if(!user){
        res.json({
            "message":"not logged in"
        })
        return done(null, false);
    }
    done(null, user);
}));