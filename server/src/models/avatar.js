'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Avatar extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {}
    }
    Avatar.init(
        {
            publicId: DataTypes.STRING,
            url: DataTypes.STRING,
            code: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Avatar',
            timestamps: true,
            paranoid: true,
        }
    );
    return Avatar;
};
