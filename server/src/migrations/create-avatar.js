'use strict';

/** @type {import('sequelize-cli').Migration} */
require('dotenv').config();
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Avatars', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            publicId: {
                type: Sequelize.STRING,
                unique: true,
            },
            url: {
                type: Sequelize.STRING,
                unique: true,
            },
            code: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                allowNull: false,
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            deletedAt: {
                allowNull: false,
                type: 'TIMESTAMP',
            },
        });

        await queryInterface.bulkInsert('Avatars', [
            {
                publicId: 'tiktok_avatar/qrabjbofeuu20wpg28o0',
                url: 'https://res.cloudinary.com/da5wewzih/image/upload/v1708242262/tiktok_avatar/qrabjbofeuu20wpg28o0.png',
                code: 'defaultAvatar',
            },
        ]);
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Avatars');
    },
};
