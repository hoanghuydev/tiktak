'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class VideoCall extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Định nghĩa mối quan hệ với các model khác
            VideoCall.belongsTo(models.User, {
                foreignKey: 'callerId',
                targetKey: 'id',
                as: 'callerData',
            });
            VideoCall.belongsTo(models.Chatroom, {
                foreignKey: 'chatroomId',
                targetKey: 'id',
                as: 'chatroomData',
            });
            VideoCall.hasMany(models.UserInCall, {
                foreignKey: 'callId',
                as: 'participants',
            });
        }
    }

    VideoCall.init(
        {
            chatroomId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            callerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            callStatus: {
                type: DataTypes.ENUM('pending', 'active', 'ended'),
                defaultValue: 'pending',
                allowNull: false,
            },
            startTime: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            endTime: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'VideoCall',
            tableName: 'video_calls',
        }
    );

    return VideoCall;
};
