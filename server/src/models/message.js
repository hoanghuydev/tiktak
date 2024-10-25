'use strict';
const { Model } = require('sequelize');
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
        }
    }
    Message.init(
        {
            sender: DataTypes.INTEGER,
            chatroomId: DataTypes.INTEGER,
            content: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Message',
        }
    );
    return Message;
};
