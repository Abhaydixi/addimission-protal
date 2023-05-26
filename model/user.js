const mongoose = require('mongoose');


// define schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    image: {
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    },
    password: {
        type: String,
        require: true
    },
    mob: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: 'student'
    }

},
    { timestamps: true })

//creat collection

const UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel;