import createError from 'http-errors';
export const badRequest = (err, res) => {
    const error = createError.BadRequest(err);
    return res.status(error.status).json({
        err: 1,
        mes: err,
    });
};
export const internalServerError = (res) => {
    const error = createError.InternalServerError();
    return res.status(error.status).json({
        err: 1,
        mes: error.message,
    });
};
export const notFound = (err, res) => {
    const error = createError.NotFound(err);
    return res.status(error.status).json({
        err: 1,
        mes: err,
    });
};
export const forBidden = (err, res) => {
    const error = createError.Forbidden(err);
    return res.status(error.status).json({
        err: 1,
        mes: err,
    });
};
export const unauthorized = (err, res) => {
    const error = createError.Unauthorized(err);
    return res.status(error.status).json({
        err: 1,
        mes: err,
    });
};
export const alreadyExistRow = (err, res) => {
    const error = createError.Conflict(err);
    return res.status(error.status).json({
        err: 1,
        mes: err,
    });
};
