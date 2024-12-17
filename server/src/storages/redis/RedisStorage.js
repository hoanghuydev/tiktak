import client from '../../config/db/redis';
import { promisify } from 'util';

class RedisStorage {
    constructor() {
        this.getAsync = promisify(client.get).bind(client);
        this.setAsync = promisify(client.set).bind(client);
        this.delAsync = promisify(client.del).bind(client);
    }

    /**
     * Lưu dữ liệu vào Redis. Dữ liệu có thể là chuỗi hoặc đối tượng.
     * @param {string} key - Khóa Redis.
     * @param {any} value - Giá trị (string hoặc object).
     * @param {number} ex - Thời gian hết hạn trong giây (optional).
     */
    async save(key, value, ex) {
        try {
            const serializedValue =
                typeof value === 'object' ? JSON.stringify(value) : value;

            const options = ex ? { EX: ex } : {};
            await this.setAsync(key, serializedValue, options);
            return true;
        } catch (err) {
            throw new Error(`Error saving to Redis: ${err.message}`);
        }
    }

    /**
     * Lấy dữ liệu từ Redis. Nếu dữ liệu là đối tượng, sẽ parse lại.
     * @param {string} key - Khóa Redis.
     * @returns {any} - Giá trị đã deserialize (object hoặc string).
     */
    async get(key) {
        try {
            const data = await this.getAsync(key);
            if (data) {
                try {
                    return JSON.parse(data);
                } catch (e) {
                    return data;
                }
            }
            return null;
        } catch (err) {
            throw new Error(`Error retrieving from Redis: ${err.message}`);
        }
    }

    /**
     * Xóa dữ liệu trong Redis.
     * @param {string} key - Khóa Redis.
     * @returns {boolean} - Trả về true nếu thành công, false nếu không tìm thấy khóa.
     */
    async del(key) {
        try {
            const result = await this.delAsync(key);
            return result > 0;
        } catch (err) {
            throw new Error(`Error deleting from Redis: ${err.message}`);
        }
    }
}

export default new RedisStorage();
