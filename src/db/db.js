const mongoose = require('mongoose');

const dev_db_url = 'mongodb+srv://carlosNguyen:Gcsvn123@cluster0.gcte7.mongodb.net/kehoachChiTieu?retryWrites=true&w=majority';
const connectionString = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});