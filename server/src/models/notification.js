'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Notification.belongsTo(models.User, {
                foreignKey: 'userId',
                targetKey: 'id',
            });
        }
    }
    Notification.init(
        {
            userId: DataTypes.INTEGER,
            content: DataTypes.STRING,
            isSeen: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Notification',
            timestamps: true,
            paranoid: true,
        }
    );
    return Notification;
};
