const express = require('express');
const app = express();
const port = 3000;

app.set('trust proxy', function (ip) {
    console.log(ip);
    if (ip === '123.123.123.123') return true // trusted IPs
    else return false
});

app.get('/user/:id', (req, res, next) => {
    if (req.params.id === '0') {
        next('route');
    } else {
        next();
    }
}, (req, res, next) => {
    res.send('regular');
});

app.get('/user/:id', (req, res, next) => {
    throw new Error('BROKEN')
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});