const one_minute = 60;
const five_minute = 300;
const GATEWAY_RATE_LIMITER_CONFIG = {
    IP_BASED: {
        keyPrefix: 'gateway_ip',
        points: 1000,
        duration: one_minute,
        blockDuration: five_minute,
    },
};
export default GATEWAY_RATE_LIMITER_CONFIG;
