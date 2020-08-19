//https://thinkster.io/tutorials/node-json-api/creating-the-user-model

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { SALT_WORK_FACTOR } = require('../utils/constants');

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

// return id instead _id: https://fullstackopen.com/en/part3/saving_data_to_mongo_db
UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// pre hash and salt password: https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
// The “this” object is empty in pre('save') fix : https://stackoverflow.com/questions/39166700/the-this-object-is-empty-in-presave/49849846
UserSchema.pre('save', function (next) {
    const user = this;
    //generate salt
    //  Illegal arguments: string, undefined fix : https://stackoverflow.com/questions/52982858/illegal-arguments-undefined-string
    bcrypt.genSalt(SALT_WORK_FACTOR, async function (err, salt) {
        if (err) return next(err);

        //hash the password using our new salt
        await bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            //override the cleartext password with the hashed one
            user.password = hash;
            console.log(user);
            next();
        })
    })
})

// when user try to login, compare the password in db and the entered 
UserSchema.methods.authenticate = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
}

UserSchema.methods.generateJWT = function () {
    const jwtToken = jwt.sign({
        id: this._id,
        name: this.name,
        email: this.email,
    }, process.env.JWT_SECRET);

    return jwtToken;
}

module.exports = mongoose.model('User', UserSchema);

