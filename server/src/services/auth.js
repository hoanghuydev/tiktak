import { Op } from 'sequelize';
import db, { Sequelize } from '../models';
import bcrypt from 'bcrypt';
const hashPassword = (password) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const register = (
    email,
    fullName,
    userName,
    password,
    association,
    isVertified
) =>
    new Promise(async (resolve, reject) => {
        try {
            password = hashPassword(password);
            const resp = await db.User.findOrCreate({
                where: { [Op.or]: [{ email }, { userName }] },
                defaults: {
                    email,
                    fullName,
                    userName,
                    password,
                    association,
                    isVertified,
                },
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const vertifyAccount = (email, otp) =>
    new Promise((resolve, reject) => {
        try {
            const resp = db.Otp.findOne({
                where: {
                    [Op.and]: [{ email: email }, { otp }],
                },
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const login = (email, password) => new Promise((resolve, reject) => {});
