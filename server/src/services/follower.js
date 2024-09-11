import { Op, literal } from 'sequelize';
import db from '../models';
import { pagingConfig } from '../utils/pagination';
import { formatQueryUser } from './user';
export const getListFollower = (
    userId,
    myId,
    { page, pageSize, orderBy, orderDirection, userName, fullName }
) =>
    new Promise(async (resolve, reject) => {
        try {
            const queries = pagingConfig(
                page,
                pageSize,
                orderBy,
                orderDirection
            );
            const query = {};
            if (userName) query.userName = { [Op.substring]: userName };
            if (fullName) query.fullName = { [Op.substring]: fullName };
            const attributes= {
                exclude: ['followerId', 'followeeId'],
                include : []
            }
            if (myId) {
                attributes.include.push(
                    [
                        literal(`(
                            SELECT EXISTS (
                                SELECT 1
                                FROM followers f
                                WHERE 
                                    f.followee = ${myId} 
                                    AND f.follower = \`Follower\`.follower
                                    AND f.id = \`Follower\`.id
                            )
                        )`),
                        'isFollowee',
                    ],
                    [
                        literal(`(
                            SELECT EXISTS (
                                SELECT 1
                                FROM followers f
                                WHERE 
                                    f.follower = ${myId} 
                                    AND f.followee = \`Follower\`.follower
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
                                    AND f.followee = \`Follower\`.follower
                            ) AND EXISTS (
                                SELECT 1
                                FROM followers f
                                WHERE 
                                    f.followee = ${myId} 
                                    AND f.follower = \`Follower\`.follower
                            )
                        )`),
                        'isFriend',
                    ]
                );
            }

            const { count, rows } = await db.Follower.findAndCountAll({
                where: {
                    followee: userId,
                },
               attributes,
                ...queries,
                include: [
                    {
                        model: db.User,
                        as: 'followerData',
                        attributes: {
                            exclude: [
                                'password',
                                'createdAt',
                                'updatedAt',
                                'roleCode',
                                'association',
                                'peerId',
                            ],
                        },
                        include: [
                            {
                                model: db.Avatar,
                                as: 'avatarData',
                                attributes: ['publicId', 'url'],
                            }
                        ],
                    },
                    {
                        model: db.User,
                        as: 'followeeData',
                        attributes: {
                            exclude: [
                                'password',
                                'createdAt',
                                'updatedAt',
                                'roleCode',
                                'association',
                                'peerId',
                            ],
                        },
                        include: [
                            {
                                model: db.Avatar,
                                as: 'avatarData',
                                attributes: ['publicId', 'url'],
                            }
                        ],
                        where: query,
                    },
                ],
            });
            const totalItems = count;
            const totalPages =
                totalItems / pageSize >= 1
                    ? Math.ceil(totalItems / pageSize)
                    : 1;
            resolve({
                followers: rows,
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
export const getListFollowing = (
    userId,
    myId,
    { page, pageSize, orderBy, orderDirection, userName, fullName }
) =>
    new Promise(async (resolve, reject) => {
        try {
            const queries = pagingConfig(
                page,
                pageSize,
                orderBy,
                orderDirection
            );
            const query = {};
            const attributes =  {
                exclude: ['followerId', 'followeeId'],
                include : []
            }
            if (myId) {
                attributes.include.push(
                    [
                        literal(`(
                            SELECT EXISTS (
                                SELECT 1
                                FROM followers f
                                WHERE 
                                    f.followee = ${myId} 
                                    AND f.follower = \`Follower\`.followee
                            )
                        )`),
                        'isFollowee',
                    ],
                    [
                        literal(`(
                            SELECT EXISTS (
                                SELECT 1
                                FROM followers f
                                WHERE 
                                    f.follower = ${myId} 
                                    AND f.followee = \`Follower\`.followee
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
                                    AND f.followee = \`Follower\`.followee
                                    AND f.id = \`Follower\`.id
                            ) AND EXISTS (
                                SELECT 1
                                FROM followers f
                                WHERE 
                                    f.followee = ${myId} 
                                    AND f.follower = \`Follower\`.followee
                            )
                        )`),
                        'isFriend',
                    ]
                );
            }
            if (userName) query.userName = { [Op.substring]: userName };
            if (fullName) query.fullName = { [Op.substring]: fullName };
            const { count, rows } = await db.Follower.findAndCountAll({
                where: {
                    follower: userId,
                },
                attributes,
                ...queries,
                include: [
                    {
                        model: db.User,
                        as: 'followerData',
                        attributes: {
                            exclude: [
                                'password',
                                'createdAt',
                                'updatedAt',
                                'roleCode',
                                'association',
                                'peerId',
                            ],
                        },
                        include: [
                            {
                                model: db.Avatar,
                                as: 'avatarData',
                                attributes: ['publicId', 'url'],
                            }
                        ],
                    },
                    {
                        model: db.User,
                        as: 'followeeData',
                        attributes: {
                            exclude: [
                                'password',
                                'createdAt',
                                'updatedAt',
                                'roleCode',
                                'association',
                                'peerId',
                            ],
                        },
                        include: [
                            {
                                model: db.Avatar,
                                as: 'avatarData',
                                attributes: ['publicId', 'url'],
                            }
                        ],
                        where: query,
                    },
                ],
            });
            const totalItems = count;
            const totalPages =
                totalItems / pageSize >= 1
                    ? Math.ceil(totalItems / pageSize)
                    : 1;
            resolve({
                followings: rows,
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
export const getFollower = (followerModel) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Follower.findOne({
                where: followerModel,
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const followUser = (follower, followee) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Follower.findOrCreate({
                where: { follower, followee },
                defaults: {
                    follower,
                    followee,
                },
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const unfollowUser = (follower, followee) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Follower.destroy({
                where: { follower, followee },
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const isFriend = (userId1, userId2) =>
    new Promise(async (resolve, reject) => {
        try {
            const isFollow = await followerServices.getFollower({
                follower: userId1,
                followee: userId2,
            });
            const isFollow2 = await followerServices.getFollower({
                follower: userId2,
                followee: userId1,
            });
            if (isFollow && isFollow2) resolve(true);
            else resolve(false);
        } catch (error) {
            reject(error);
        }
    });
