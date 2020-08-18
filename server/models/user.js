//https://thinkster.io/tutorials/node-json-api/creating-the-user-model

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

//https://www.npmjs.com/package/mongoose-unique-validator
const uniqueValidator = require('mongoose-unique-validator');

// timeStamps:https://mongoosejs.com/docs/guide.html#timestamps
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        required: true,
        unique: true
    },
    email: {
        type: String,
        minlength: 5,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 5,
        required: true
    },
    roles: {
        type: Array,
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

//uniqueValidator: https://www.npmjs.com/package/mongoose-unique-validator
UserSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });
UserSchema.methods.generateJWT = function () {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 10);

    return jwt.sign({
        id: this._id,
        name: this.name,
        exp: parseInt(exp.getTime() / 1000),
    }, process.env.JWT_SECRET);
}

module.exports = mongoose.model('User', UserSchema);

