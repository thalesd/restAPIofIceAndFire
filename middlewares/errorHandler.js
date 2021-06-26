module.exports = (error, req, res, next) => {
    //console.log(error);
    let status = error.statusCode;
    let message = error.message;

    if(!status) status = 500;

    res.status(status).json({ message });
};