const express = require('express');
const userRouter = require('./src/routes/user');
const chitieuRouter = require('./src/routes/chitieu');
const port = process.env.PORT;
const bodyParser = require('body-parser');
const errorHandler = require('./src/middleware/errorHandler');
require('./src/db/db');

const app = express();

app.use([
    express.json(),
    userRouter,
    chitieuRouter,
    bodyParser.json(),
    errorHandler()
]);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})