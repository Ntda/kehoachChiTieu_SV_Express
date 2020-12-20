const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/users', async (req, res) => {
    try {
        const {
            userName,
            email,
            password
        } = req.body;
        console.log('[body]: ' + userName + email + password);
        const user = new User({
            userName,
            email,
            password
        });
        await user.save(function (err) {
            if (err) {
                console.log('insert failed: ' + err)
            }
        });

        const token = await user.generateAuthToken();
        console.log('[token]: ' + token);
        res.status(200).send({ user, token });
    } catch (error) {
        console.log('[error]: ' + JSON.stringify(error));
        res.status(400).send(error);
    }
});

router.post('/users/login', async (req, res, next) => {
    try {
        const {
            userName,
            email,
            password
        } = req.body;
        console.log('[userName]' + userName);
        const user = await User.findByCredentials(userName, password);
        if (!user) {
            res.status(401).send({ error: 'Login failed! Check authentication credentials' });
        }
        const token = await user.generateAuthToken();
        const responseData = {
            user: {
                email: user.email,
                userName: user.userName
            },
            token
        };
        res.status(200).json({ ...responseData });
    } catch (error) {
        next(error);
        //res.status(400).json(error);
    }
});

router.get('/users/me', auth, (req, res) => {
    res.status(200).json(req.user);
});

router.post('/users/me/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        await req.user.save();
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;