import { Op, where } from 'sequelize';
import db, { Sequelize } from '../models';
import bcrypt from 'bcrypt';
import {
    formatQueryUserWithAvatarData,
    formatQueryUserWithRoleAndAvatarData,
} from './user';

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
            const resp = await db.User.findOrCreate({
                where: { [Op.or]: [{ email }, { userName }] },
                ...formatQueryUserWithRoleAndAvatarData(),
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
export const login = (emailOrUserName) =>
    new Promise((resolve, reject) => {
        try {
            const resp = db.User.findOne({
                where: {
                    [Op.or]: [
                        { email: emailOrUserName },
                        { userName: emailOrUserName },
                    ],
                    isVertified: true,
                    association: '',
                },
                ...formatQueryUserWithRoleAndAvatarData(),
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
