import { Op, literal, where } from 'sequelize';
import db from '../models';
import { paginationResponse, pagingConfig } from '../utils/pagination';
export const formatQueryUserWithRoleAndAvatarData = (havePassword) => {
    return {
        attributes: {
            exclude: [
                'roleCode',
                'avatarPublicId',
                !havePassword && 'password',
            ],
        },
        include: [
            {
                model: db.Avatar,
                as: 'avatarData',
                attributes: {
                    exclude: [
                        'createdAt',
                        'updatedAt',
                        'id',
                        'publicId',
                        'code',
                    ],
                },
            },
            {
                model: db.Role,
                as: 'roleData',
                attributes: ['id', 'code', 'value'],
            },
        ],
    };
};
export const formatQueryUserWithAvatarData = {
    include: [
        {
            model: db.Avatar,
            as: 'avatarData',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
    ],
};
export const findUsers = (
    { page, pageSize, orderBy, orderDirection, name },
    myId
) =>
    new Promise(async (resolve, reject) => {
        try {
            const queries = pagingConfig(
                page,
                pageSize,
                name
                    ? literal(`(
                    SELECT COUNT(*)
                    FROM followers f
                    WHERE f.followee = User.id
                )`)
                    : orderBy,
                name ? 'DESC' : orderDirection
            );

            const whereClause = name
                ? {
                      [Op.or]: [
                          { userName: { [Op.like]: `%${name}%` } },
                          { fullName: { [Op.like]: `%${name}%` } },
                      ],
                  }
                : {};
            const attributes = ['id', 'userName', 'fullName'];
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
                ];
            }
            const { count, rows } = await db.User.findAndCountAll({
                where: whereClause,
                attributes,
                ...formatQueryUserWithAvatarData,
                ...queries,
            });

            resolve({
                users: rows,
                ...paginationResponse(queries, pageSize, page, count),
            });
        } catch (error) {
            reject(error);
        }
    });
export const getProfile = (partnerUsername, myId) =>
    new Promise(async (resolve, reject) => {
        try {
            if (!partnerUsername) reject(false);
            const attributes = {
                exclude: ['password'],
                include: [
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
                    ],
                    [
                        literal(`(
                            SELECT COUNT(*)
                            FROM followers f1
                            INNER JOIN followers f2 ON f1.follower = f2.followee
                            WHERE f1.followee = User.id AND f2.follower = User.id
                        )`),
                        'friends',
                    ],
                ],
            };
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
                            FROM users u
                            WHERE u.id = ${myId}
                            AND u.username = User.username
                        )
                        )`),
                        'isMe',
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
                    ]
                );
            }
            const user = await db.User.findOne({
                where: {
                    username: partnerUsername,
                },
                attributes,
                ...formatQueryUserWithAvatarData,
            });
            resolve(user);
        } catch (error) {
            reject(error);
        }
    });
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
                ...formatQueryUserWithRoleAndAvatarData(),
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
