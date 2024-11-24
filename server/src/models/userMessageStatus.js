'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserMessageStatus extends Model {
        static associate(models) {
            UserMessageStatus.belongsTo(models.User, {
                foreignKey: 'user_id',
                targetKey: 'id',
                as: 'userData',
            });
            UserMessageStatus.belongsTo(models.Message, {
                foreignKey: 'message_id',
                targetKey: 'id',
                as: 'messageData',
            });
        }
    }

    UserMessageStatus.init(
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            message_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'UserMessageStatus',
            tableName: 'user_message_status',
            timestamps: true,
            paranoid: true,
        }
    );

    return UserMessageStatus;
};
