import { literal, Op, where } from 'sequelize';
import db from '../models';
import {
    formatQueryUserWithAvatarData,
    formatQueryUserWithRoleAndAvatarData,
} from '../services/user';
import { paginationResponse, pagingConfig } from '../utils/pagination';

class UserRepository {
    async findUsersByName(
        { page, pageSize, orderBy, orderDirection, name },
        viewerId
    ) {
        const paginationQuery = pagingConfig(
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
        const searchConditions = name
            ? {
                  [Op.or]: [
                      { userName: { [Op.like]: `%${name}%` } },
                      { fullName: { [Op.like]: `%${name}%` } },
                  ],
              }
            : {};
        const userAttributes = ['id', 'userName', 'fullName'];
        if (viewerId) {
            userAttributes.push(
                [
                    literal(`
                    EXISTS (
                        SELECT 1
                        FROM followers f
                        WHERE 
                            f.follower = ${viewerId} 
                            AND User.id = f.followee
                    )
                    `),
                    'isFollow',
                ],
                [
                    literal(`
                    EXISTS 
                        (
                            SELECT 1 FROM followers f1 
                            JOIN followers f2 ON f1.follower = f2.followee 
                            AND f1.followee = f2.follower
                            WHERE f1.follower = ${viewerId} 
                            AND f1.followee = User.id
                        ) 
                  `),
                    'isFriend',
                ]
            );
        }
        const { count, rows } = await db.User.findAndCountAll({
            where: searchConditions,
            attributes: userAttributes,
            ...formatQueryUserWithAvatarData,
            ...paginationQuery,
        });
        return {
            users: rows,
            ...paginationResponse(paginationQuery, pageSize, page, count),
        };
    }
    async findByEmailOrUsername(emailOrUsername) {
        return await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: emailOrUsername },
                    { userName: emailOrUsername },
                ],
                isVertified: true,
                association: '',
            },
            ...formatQueryUserWithRoleAndAvatarData(true),
        });
    }

    async findById(id) {
        return await db.User.findByPk(id, {
            ...formatQueryUserWithRoleAndAvatarData(),
        });
    }
    async findOne(filter) {
        return await db.User.findOne({
            where: filter,
            ...formatQueryUserWithRoleAndAvatarData(),
        });
    }
    async remove(id) {
        return await db.User.destroy({
            where: { id },
        });
    }
    async findUserByAttributes(filter, fields = null) {
        return await db.User.findOne({
            where: filter,
            attributes: fields,
        });
    }
    async existByEmailOrUsername({ email, userName }) {
        const whereClause = [];
        if (email) whereClause.push({ email });
        if (userName) whereClause.push({ userName });
        const user = await db.User.findOne({
            where: {
                [Op.or]: whereClause,
            },
        });
        return !!user;
    }

    async createUser(data) {
        return await db.User.create(data);
    }

    async updateUser(data, filter) {
        const update = await db.User.update(data, {
            where: filter,
        });
        return update[0] ? this.findOne(filter) : null;
    }
    async findOrCreateUser(data) {
        return await db.User.findOrCreate({
            where: {
                [Op.or]: [{ email: data.email }, { userName: data.userName }],
            },
            defaults: data,
        });
    }
    async getProfileByUsername(username, viewerId) {
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
        if (viewerId) {
            attributes.include.push(
                [
                    literal(`(
                        SELECT EXISTS (
                            SELECT 1
                            FROM followers f
                            WHERE 
                                f.follower = ${viewerId} 
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
                        WHERE u.id = ${viewerId}
                        AND u.username = User.username
                    )
                    )`),
                    'isMe',
                ],
                [
                    literal(`(
                    SELECT EXISTS (
                        SELECT 1 FROM followers f1 
                        JOIN followers f2 ON f1.follower = f2.followee 
                        AND f1.followee = f2.follower
                         WHERE f1.follower = ${viewerId} 
                         AND f1.followee = User.id
                        ) 
                        AS isFriend
                  )`),
                    'isFriend',
                ]
            );
        }
        const user = await db.User.findOne({
            where: {
                username,
            },
            attributes,
            ...formatQueryUserWithAvatarData,
        });
        return user;
    }
}

export default new UserRepository();
