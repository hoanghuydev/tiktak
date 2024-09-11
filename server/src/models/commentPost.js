'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CommentPost extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            CommentPost.belongsTo(models.User, {
                foreignKey: 'commenter',
                targetKey: 'id',
                as: 'commenterData',
            });
            CommentPost.belongsTo(models.Post, {
                foreignKey: 'postId',
                targetKey: 'id',
                as: 'postData',
            });
        }
    }
    CommentPost.init(
        {
            commenter: DataTypes.INTEGER,
            postId: DataTypes.INTEGER,
            content: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'CommentPost',
            tableName: 'commentspost',
        }
    );
    return CommentPost;
};
