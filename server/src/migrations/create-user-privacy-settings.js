'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user_privacy_settings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users', // Assumes you have a Users table
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            account_privacy: {
                type: Sequelize.ENUM('public', 'private'),
                defaultValue: 'public',
            },
            who_can_send_messages: {
                type: Sequelize.ENUM('everyone', 'friends_only', 'no_one'),
                defaultValue: 'friends_only',
            },
            who_can_duet: {
                type: Sequelize.ENUM('everyone', 'friends_only', 'no_one'),
                defaultValue: 'everyone',
            },
            who_can_stitch: {
                type: Sequelize.ENUM('everyone', 'friends_only', 'no_one'),
                defaultValue: 'everyone',
            },
            who_can_comment: {
                type: Sequelize.ENUM('everyone', 'friends_only', 'no_one'),
                defaultValue: 'everyone',
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal(
                    'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
                ),
            },
        });

        // Create an index on `user_id` column for faster lookups
        await queryInterface.addIndex('user_privacy_settings', ['user_id'], {
            name: 'idx_user_id',
        });
    },

    async down(queryInterface, Sequelize) {
        // Remove the index first before dropping the table
        await queryInterface.removeIndex(
            'user_privacy_settings',
            'idx_user_id'
        );
        await queryInterface.dropTable('user_privacy_settings');
    },
};
