const handleError = () => {
    return (err, req, res, next) => {
        console.log(JSON.stringify(err));
        res.status(401).json('Invalid login credentials');
    }
}

module.exports = handleError;