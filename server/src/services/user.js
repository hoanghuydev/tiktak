import { Op, literal, where } from 'sequelize';
import db from '../models';
import { pagingConfig } from '../utils/pagination';
export const formatQueryUserWithAtrr = {
    attributes: {
        exclude: ['roleCode', 'avatarPublicId'],
    },
    include: [
        {
            model: db.Avatar,
            as: 'avatarData',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
            model: db.Role,
            as: 'roleData',
            attributes: ['id', 'code', 'value'],
        },
    ],
};
export const formatQueryUser = {
    include: [
        {
            model: db.Avatar,
            as: 'avatarData',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
    ],
};
export const findUsers = ({
    page,
    pageSize,
    orderBy,
    orderDirection,
    name
},myId) =>
    new Promise(async (resolve, reject) => {
        try {
            const queries = pagingConfig(
                page,
                pageSize,
                orderBy,
                orderDirection
            );
            
            const whereClause = name ? {
                [Op.or]: [
                    { userName: { [Op.like]: `%${name}%` } },
                    { fullName: { [Op.like]: `%${name}%` } }
                ]
            } : {};
            const attributes = ['id', 'userName', 'fullName']
            if (myId) {
                attributes.include = [
                    [
                        literal(`(
                            SELECT EXISTS (
                                SELECT 1
                                FROM followers f
                                WHERE 
                                    f.follower = ${myId} 
                                    AND User.id = f.followee
                            )
                            )`),
                        'isFollow',
                    ],
                    [
                        literal(`(
                            SELECT EXISTS (
                              SELECT 1
                                FROM followers f
                                WHERE 
                                    f.follower = ${myId} 
                                    AND User.id = f.followee
                            )
                            AND EXISTS (
                              SELECT 1
                                FROM followers f
                                WHERE 
                                    f.followee = ${myId} 
                                    AND User.id = f.follower
                            )
                          )`),
                        'isFriend',
                    ],
                ]
            }
            const { count, rows } = await db.User.findAndCountAll({
                where: whereClause,
                attributes,
                ...formatQueryUser,
                ...queries,
            });
            const totalItems = count;
            const totalPages =
                totalItems / pageSize >= 1
                    ? Math.ceil(totalItems / pageSize)
                    : 1;
            resolve({
                users: rows,
                pagination: {
                    orderBy: queries.orderBy,
                    page: queries.offset + 1,
                    pageSize: queries.limit,
                    orderDirection: queries.orderDirection,
                    totalItems,
                    totalPages,
                },
            });
        } catch (error) {
            reject(error);
        }
    });
export const getProfile = (partnerId,myId) => 
    new Promise(async (resolve,reject) => {
        try {
            if(!partnerId) reject(false)
            const attributes = {
                include : [
                    [
                        literal(`(
                            SELECT COUNT(*)
                            FROM followers f
                            WHERE f.followee = User.id
                        )`),
                        'followers',
                    ],
                    [
                        literal(`(
                            SELECT COUNT(*)
                            FROM followers f
                            WHERE f.follower = User.id
                        )`),
                        'followings',
                    ],
                    [
                        literal(`(
                            SELECT COUNT(*) 
                            FROM likespost lp , posts p 
                            WHERE lp.postId = p.id AND p.poster = User.id
                        )`),
                        'likes',
                    ]
                ]
            }
            if (myId) {
                attributes.include.push(
                    [
                        literal(`(
                            SELECT EXISTS (
                                SELECT 1
                                FROM followers f
                                WHERE 
                                    f.follower = ${myId} 
                                    AND User.id = f.followee
                            )
                            )`),
                        'isFollow',
                    ],
                    [
                        literal(`(
                            SELECT EXISTS (
                              SELECT 1
                                FROM followers f
                                WHERE 
                                    f.follower = ${myId} 
                                    AND User.id = f.followee
                            )
                            AND EXISTS (
                              SELECT 1
                                FROM followers f
                                WHERE 
                                    f.followee = ${myId} 
                                    AND User.id = f.follower
                            )
                          )`),
                        'isFriend',
                    ],
                )
            }
            const user = await db.User.findOne({
                where : {
                    id : partnerId
                },
                attributes,
                ...formatQueryUser
            })
            resolve(user);
        } catch (error) {
            reject(error)
        }
    })
export const updateUser = (newDataUser, id) =>
    new Promise((resolve, reject) => {
        try {
            const resp = db.User.update(newDataUser, {
                where: { id },
                raw: true,
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const findOne = (user) =>
    new Promise((resolve, reject) => {
        try {
            const resp = db.User.findOne({
                where: user,
                attributes: {
                    exclude: ['roleCode'],
                },
                ...formatQueryUserWithAtrr,
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
