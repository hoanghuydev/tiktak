'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('video_calls', {
            call_id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            chatroom_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'chatrooms',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            caller_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            call_status: {
                type: Sequelize.ENUM('pending', 'active', 'ended'),
                defaultValue: 'pending',
                allowNull: false,
            },
            start_time: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
                allowNull: false,
            },
            end_time: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
                onUpdate: Sequelize.NOW,
            },
            deletedAt: {
                allowNull: false,
                type: 'TIMESTAMP',
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('video_calls');
    },
};
c;
