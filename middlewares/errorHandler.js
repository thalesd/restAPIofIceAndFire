module.exports = (error, req, res, next) => {
    console.log(error);
    const status = error.statusCode;
    const message = error.message;

    res.status(status).json({ message });
};