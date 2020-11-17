const express = require('express');
const userRouter = require('./src/routes/user');
const port = process.env.PORT;
const bodyParser = require('body-parser');
const errorHandler = require('./src/middleware/errorHandler');
require('./src/db/db');

const app = express();

app.use([
    express.json(),
    userRouter,
    bodyParser.json(),
    errorHandler()
]);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})