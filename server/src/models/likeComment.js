'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LikeComment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            LikeComment.belongsTo(models.User, {
                foreignKey: 'liker',
                targetKey: 'id',
            });
            LikeComment.belongsTo(models.CommentPost, {
                foreignKey: 'commentPostId',
                targetKey: 'id',
            });
        }
    }
    LikeComment.init(
        {
            liker: DataTypes.INTEGER,
            commentPostId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'LikeComment',
            tableName: 'likescomment',
        }
    );
    return LikeComment;
};
