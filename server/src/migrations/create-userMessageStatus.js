'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('user_message_status', {
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            message_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Messages',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            is_deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            deletedAt: {
                allowNull: false,
                type: 'TIMESTAMP',
            },
        });

        // Add a unique composite primary key on (user_id, message_id)
        await queryInterface.addConstraint('user_message_status', {
            fields: ['user_id', 'message_id'],
            type: 'primary key',
            name: 'pk_user_message_status',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('user_message_status');
    },
};
