export const globalErrorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    console.error(`[Error] ${status}: ${message}`);

    return res.status(status).json({
        err: 1,
        mes: message,
    });
};
