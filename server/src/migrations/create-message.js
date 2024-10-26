'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Messages', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            sender: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
            content: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            chatroomId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Chatrooms',
                    key: 'id',
                },
            },
            type: {
                type: Sequelize.ENUM('video', 'image', 'text'),
                allowNull: false,
                defaultValue: 'text',
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
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Messages');
    },
};
