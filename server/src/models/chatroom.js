'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Chatroom extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Chatroom.hasMany(models.UserInChatroom, {
                foreignKey: 'chatroomId',
                as: 'members',
            });
            Chatroom.hasMany(models.Message, {
                foreignKey: 'chatroomId',
                as: 'messages',
            });
            Chatroom.hasOne(models.Message, {
                foreignKey: 'chatroomId',
                as: 'lastMessage',
                scope: {},
                constraints: false,
            });
        }
    }
    Chatroom.init(
        {
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Chatroom',
        }
    );
    return Chatroom;
};
