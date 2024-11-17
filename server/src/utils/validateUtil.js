import createError from 'http-errors';

export const validatePrivacySetting = (setting) => {
    if (Object.values(PrivacySetting).includes(setting)) return true;
    else return false;
};
export const validateSchema = async (schema, data) => {
    try {
        await schema.validate(data, { abortEarly: false });
    } catch (error) {
        const validationErrors = error.inner.map((err) => ({
            field: err.path,
            message: err.message,
        }));

        // Ném lỗi với chi tiết validation
        throw createError(400, {
            message:
                'Validation error: Please fill all required fields and enter valid data',
            details: validationErrors,
        });
    }
};
