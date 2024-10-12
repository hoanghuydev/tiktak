import { Op, literal } from 'sequelize';
import db from '../models';
import { pagingConfig } from '../utils/pagination';
import { formatQueryUser } from './user';

// Helper to build attributes for user related queries
const buildUserAttributes = (myId, isFollowee) => ({
    exclude: [
        'password',
        'createdAt',
        'updatedAt',
        'roleCode',
        'association',
        'peerId',
    ],
    include: myId
        ? [
              [
                  literal(
                      `EXISTS (SELECT 1 FROM followers WHERE followee=${myId} AND follower=Follower.${
                          isFollowee ? 'followee' : 'follower'
                      })`
                  ),
                  'isFollowee',
              ],
              [
                  literal(
                      `EXISTS (SELECT 1 FROM followers WHERE follower=${myId} AND followee=Follower.${
                          isFollowee ? 'followee' : 'follower'
                      })`
                  ),
                  'isFollow',
              ],
              [
                  literal(
                      `EXISTS (SELECT 1 FROM followers WHERE follower=${myId} AND followee=Follower.${
                          isFollowee ? 'followee' : 'follower'
                      }) AND EXISTS (SELECT 1 FROM followers WHERE followee=${myId} AND follower=Follower.${
                          isFollowee ? 'followee' : 'follower'
                      })`
                  ),
                  'isFriend',
              ],
          ]
        : [],
});

// Helper to build filters based on user input
const buildQueryFilter = (userName, fullName) => ({
    ...(userName && { userName: { [Op.substring]: userName } }),
    ...(fullName && { fullName: { [Op.substring]: fullName } }),
});

// Function to get list of followers
export async function getListFollower(
    userId,
    myId,
    { page, pageSize, orderBy, orderDirection, userName, fullName }
) {
    const queries = pagingConfig(page, pageSize, orderBy, orderDirection);
    const filter = buildQueryFilter(userName, fullName);
    const attributes = buildUserAttributes(myId, false);

    const { count, rows } = await db.Follower.findAndCountAll({
        where: { followee: userId, ...filter },
        ...queries,
        include: [
            {
                model: db.User,
                as: 'followerData',
                attributes,
                include: [
                    {
                        model: db.Avatar,
                        as: 'avatarData',
                        attributes: ['publicId', 'url'],
                    },
                ],
            },
        ],
    });

    return {
        users: rows.map((row) => row.followerData),
        pagination: {
            orderBy,
            page,
            pageSize,
            orderDirection,
            totalItems: count,
            totalPages: Math.ceil(count / pageSize),
        },
    };
}

// Function to get list of following
export async function getListFollowing(
    userId,
    myId,
    { page, pageSize, orderBy, orderDirection, userName, fullName }
) {
    const queries = pagingConfig(page, pageSize, orderBy, orderDirection);
    const filter = buildQueryFilter(userName, fullName);
    const attributes = buildUserAttributes(myId, true);

    const { count, rows } = await db.Follower.findAndCountAll({
        where: { follower: userId, ...filter },
        ...queries,
        include: [
            {
                model: db.User,
                as: 'followeeData',
                attributes,
                include: [
                    {
                        model: db.Avatar,
                        as: 'avatarData',
                        attributes: ['publicId', 'url'],
                    },
                ],
            },
        ],
    });

    return {
        users: rows.map((row) => row.followeeData),
        pagination: {
            orderBy,
            page,
            pageSize,
            orderDirection,
            totalItems: count,
            totalPages: Math.ceil(count / pageSize),
        },
    };
}
export const getListFriend = (
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

            const attributes = {
                exclude: [
                    'password',
                    'updatedAt',
                    'roleCode',
                    'association',
                    'peerId',
                ],
                include: [],
            };

            const { count, rows } = await db.User.findAndCountAll({
                ...queries,
                where: query,
                attributes,
                include: [
                    {
                        model: db.Follower,
                        as: 'followingData',
                        required: true,
                        where: {
                            followee: userId,
                        },
                        attributes: [],
                    },
                    {
                        model: db.Follower,
                        as: 'followerData',
                        required: true,
                        where: {
                            follower: userId,
                        },
                        attributes: [],
                    },
                    {
                        model: db.Avatar,
                        as: 'avatarData',
                        attributes: ['publicId', 'url'],
                    },
                ],
            });

            const totalItems = count;
            const totalPages =
                totalItems / pageSize >= 1
                    ? Math.ceil(totalItems / pageSize)
                    : 1;

            const processedFriends = rows.map((item) => ({
                ...item.dataValues,
            }));

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
