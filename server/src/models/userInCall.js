'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserInCall extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Định nghĩa mối quan hệ với các model khác
            UserInCall.belongsTo(models.VideoCall, {
                foreignKey: 'callId',
                targetKey: 'call_id',
                as: 'callData',
            });
            UserInCall.belongsTo(models.User, {
                foreignKey: 'userId',
                targetKey: 'id',
                as: 'userData',
            });
        }
    }

    UserInCall.init(
        {
            callId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM('joined', 'left'),
                defaultValue: 'joined',
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'UserInCall',
            tableName: 'users_in_call',
        }
    );

    return UserInCall;
};
