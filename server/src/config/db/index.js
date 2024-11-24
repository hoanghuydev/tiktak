const dotenv = require('dotenv');
import path from 'path';
import fs from 'fs';
import { log } from 'console';
dotenv.config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    null,
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: false,
    }
);

async function getConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// Hàm dùng để đồng bộ model từ code sang mysql
async function syncDb() {
    try {
        await sequelize.sync({ alter: true });
        console.log('All models synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing models:', error);
    }
}
module.exports = { getConnection, syncDb };
