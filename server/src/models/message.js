'use strict';
const { Model } = require('sequelize');
const { MESSAGE_TYPE } = require('../../constant');
module.exports = (sequelize, DataTypes) => {
    class Message extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Message.belongsTo(models.User, {
                foreignKey: 'sender',
                targetKey: 'id',
                as: 'senderData',
            });
            Message.belongsTo(models.Chatroom, {
                foreignKey: 'chatroomId',
                as: 'chatroomData',
            });
            Message.hasMany(models.UserMessageStatus, {
                foreignKey: 'message_id',
                as: 'messageStatus',
            });
        }
    }
    Message.init(
        {
            sender: DataTypes.INTEGER,
            chatroomId: DataTypes.INTEGER,
            content: DataTypes.STRING,
            type: {
                type: DataTypes.ENUM(
                    MESSAGE_TYPE.VIDEO,
                    MESSAGE_TYPE.IMAGE,
                    MESSAGE_TYPE.TEXT
                ),
                defaultValue: MESSAGE_TYPE.TEXT,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Message',
            timestamps: true,
            paranoid: true,
        }
    );
    return Message;
};
