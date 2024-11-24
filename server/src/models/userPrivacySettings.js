'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserPrivacySetting extends Model {
        /**
         * Helper method for defining associations.
         */
        static associate(models) {
            // Association with the User model
            UserPrivacySetting.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'userData',
            });
        }
    }

    UserPrivacySetting.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            account_privacy: {
                type: DataTypes.ENUM('public', 'private'),
                defaultValue: 'public',
            },
            who_can_send_messages: {
                type: DataTypes.ENUM('everyone', 'friends_only', 'no_one'),
                defaultValue: 'friends_only',
            },
            who_can_duet: {
                type: DataTypes.ENUM('everyone', 'friends_only', 'no_one'),
                defaultValue: 'everyone',
            },
            who_can_stitch: {
                type: DataTypes.ENUM('everyone', 'friends_only', 'no_one'),
                defaultValue: 'everyone',
            },
            who_can_comment: {
                type: DataTypes.ENUM('everyone', 'friends_only', 'no_one'),
                defaultValue: 'everyone',
            },
        },
        {
            sequelize,
            modelName: 'UserPrivacySetting',
            tableName: 'user_privacy_settings',
            underscored: true,
            timestamps: true,
            paranoid: true,
        }
    );

    return UserPrivacySetting;
};
