const express = require('express');
const User = require('../models/User');
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

router.post('/users/login', async (req, res) => {
    try {
        const {
            userName,
            email,
            password
        } = req.body;
        console.log('[userName]'+ userName);
        const user = await User.findByCredentials(email, password);
        if (!user) {
            res.status(401).send({ error: 'Login failed! Check authentication credentials' });
        }
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;