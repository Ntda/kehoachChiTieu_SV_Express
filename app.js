const express = require('express');
const userRouter = require('./src/routes/user');
const port = process.env.PORT;
var bodyParser = require('body-parser');
require('./src/db/db');

const app = express();

app.use([
    express.json(),
    userRouter,
    bodyParser.json()
]);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})