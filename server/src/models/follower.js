'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Follower extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Follower.belongsTo(models.User, {
                foreignKey: 'follower',
                targetKey: 'id',
                as: 'followerData',
            });
            Follower.belongsTo(models.User, {
                foreignKey: 'followee',
                targetKey: 'id',
                as: 'followeeData',
            });
        }
    }
    Follower.init(
        {
            follower: DataTypes.INTEGER,
            followee: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Follower',
            timestamps: true,
            paranoid: true,
        }
    );
    return Follower;
};
