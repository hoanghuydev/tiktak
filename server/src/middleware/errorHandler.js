export const globalErrorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = status === 500 ? 'Internal Server Error' : err.message;
    console.error(err);
    console.error(`[Error] ${status}: ${err.message}`);

    return res.status(status).json({
        err: 1,
        mes: message,
        ...(status !== 500 && err.details && { details: err.details }),
    });
};
