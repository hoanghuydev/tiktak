'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Posts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            views: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            comments: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            visibility: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 1,
            },
            shares: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            poster: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            thumnailUrl: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            videoUrl: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            thumnailId: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            videoId: {
                allowNull: true,
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
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Posts');
    },
};
