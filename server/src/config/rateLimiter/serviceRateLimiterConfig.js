const one_minute = 60;
const five_minute = 300;
const ten_minute = 600;

const SERVICE_RATE_LIMITER_CONFIG = {
    LOGIN: {
        keyPrefix: 'auth_login',
        points: 8,
        duration: one_minute,
        blockDuration: five_minute,
    },
    REGISTRATION: {
        keyPrefix: 'auth_registration',
        points: 5,
        duration: one_minute,
        blockDuration: ten_minute,
    },
    VERIFY_EMAIL: {
        keyPrefix: 'auth_verify',
        points: 4,
        duration: one_minute,
        blockDuration: ten_minute,
    },
};

export default SERVICE_RATE_LIMITER_CONFIG;
