'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users_in_call', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            call_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'video_calls',
                    key: 'call_id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            status: {
                type: Sequelize.ENUM('joined', 'left'),
                defaultValue: 'joined',
                allowNull: false,
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
        await queryInterface.dropTable('users_in_call');
    },
};
