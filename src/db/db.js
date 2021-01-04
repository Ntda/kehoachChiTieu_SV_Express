const mongoose=require('mongoose');

const connectionString='mongodb+srv://carlosNguyen:Gcsvn123@cluster0.gcte7.mongodb.net/kehoachChiTieu?retryWrites=true&w=majority';
mongoose.connect(connectionString,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});