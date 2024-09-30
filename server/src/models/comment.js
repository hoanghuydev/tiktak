'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Comment.belongsTo(models.User, {
                foreignKey: 'commenter',
                targetKey: 'id',
                as: 'commenterData',
            });
            Comment.belongsTo(models.Post, {
                foreignKey: 'postId',
                targetKey: 'id',
                as: 'postData',
            });
            Comment.belongsTo(models.Comment, {
                foreignKey: 'parentCommentId',
                targetKey: 'id',
                as: 'parentComment',
            });
            Comment.hasMany(models.Comment, {
                foreignKey: 'parentCommentId',
                as: 'replies',
            });
        }
    }
    Comment.init(
        {
            commenter: DataTypes.INTEGER,
            postId: DataTypes.INTEGER,
            content: DataTypes.STRING,
            parentCommentId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Comment',
            tableName: 'comments',
        }
    );
    return Comment;
};
