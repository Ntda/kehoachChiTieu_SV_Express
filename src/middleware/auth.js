const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    console.log('req: ' + req.header('Authorization'));
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const data = jwt.verify(token, 'WinterIsComingGOT2019');
        let user = await User.findOne({ _id: data._id, 'tokens.token': token });
        if (user) {
            delete user._doc.password;
            delete user._doc.tokens;
            console.log(user);
            req.user = user;
            next();
        } else {
            res.status(401).json({ error: 'Not authorized to access this resource' });
        }

    } catch (err) {
        console.log(err)
        res.status(401).json({ error: 'Not authorized to access this resource' });
    }
}

module.exports = auth;