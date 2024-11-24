'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('LikesPost', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            liker: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
            postId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Posts',
                    key: 'id',
                },
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
        await queryInterface.dropTable('LikesPost');
    },
};
