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
