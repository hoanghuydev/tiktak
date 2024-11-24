'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Livestream extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Livestream.belongsTo(models.User, {
                foreignKey: 'streamer',
                targetKey: 'id',
                as: 'streamerData',
            });
        }
    }
    Livestream.init(
        {
            streamer: DataTypes.STRING,
            status: DataTypes.INTEGER,
            title: DataTypes.STRING,
            key: DataTypes.STRING,
            views: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Livestream',
            timestamps: true,
            paranoid: true,
        }
    );
    return Livestream;
};
