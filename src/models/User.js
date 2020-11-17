const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const CONST = require('../const/const');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({ error: 'Invalid Email address' })
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({ token });
    try {
        await user.save();
    } catch (error) {
        console.log('[token]: ' + error);
    }
    return token;
};

userSchema.statics.findByCredentials = async function (userName, password) {
    const user = await this.findOne({ userName });
    if (!user) {
        let error = new Error(CONST.SIGNIN.FAIL.MESSAGE);
        error.error_message = CONST.SIGNIN.FAIL.MESSAGE;
        error.error_code = CONST.SIGNIN.FAIL.ERRORCODE;
        throw error;
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        let error = new Error(CONST.SIGNIN.FAIL.MESSAGE);
        error.error_message = CONST.SIGNIN.FAIL.MESSAGE;
        error.error_code = CONST.SIGNIN.FAIL.ERRORCODE;
        throw error;
    }
    return user;
}

const User = mongoose.model('User', userSchema);
module.exports = User;