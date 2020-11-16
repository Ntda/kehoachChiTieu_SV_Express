const enableCors = () => {
    return (req, res, next) => {
        res.header('Access-Control-Allow_Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    }
}

module.exports = enableCors;