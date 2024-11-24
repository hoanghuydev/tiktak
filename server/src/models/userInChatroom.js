'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserInChatroom extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            UserInChatroom.belongsTo(models.User, {
                foreignKey: 'member',
                targetKey: 'id',
                as: 'memberData',
            });
            UserInChatroom.belongsTo(models.Chatroom, {
                foreignKey: 'chatroomId',
                targetKey: 'id',
                as: 'members',
            });
        }
    }
    UserInChatroom.init(
        {
            member: DataTypes.INTEGER,
            chatroomId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'UserInChatroom',
            tableName: 'usersinchatroom',
            timestamps: true,
            paranoid: true,
        }
    );
    return UserInChatroom;
};
