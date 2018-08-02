const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const usersSchema = new Schema({
    googleID: {
        type: String,
        default: null,
    },
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    grpID:{
        type: String,
        default: null,
    }
})
// usersSchema.pre('save',async function (next) {
//     const salt = await bcrypt.genSalt(10);
//     const passwordHased = await bcrypt.hash(this.password, salt);
//     this.password = passwordHased;
//     next();
// })
// usersSchema.method.isValidPassword = async function (password) {
//     bcrypt.compare(password, this.password)
// }
mongoose.model('users', usersSchema)