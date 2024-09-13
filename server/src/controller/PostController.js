import { badRequest, internalServerError } from '../utils/handleResp';
import UploadFile from '../utils/uploadFile';
import FfmpegUtil from '../utils/ffmpeg';
const path = require('path');
import * as postServices from '../services/post';
import { uuidv4 } from 'uuid';
import * as likePostService from '../services/likePost';
import * as notificationService from '../services/notification';
import * as postService from '../services/post';

import {
    VISIBILITY_POST_FRIEND,
    VISIBILITY_POST_PRIVATE,
    VISIBILITY_POST_PUBLIC,
} from '../../constant';
const fs = require('fs');
class PostController {
    async likePost(req, res) {
        try {
            const { postId } = req.params;
            const post = await postService.getOne(postId);
            const userId = post.poster;
            console.log('Poster ', userId);
            // const notify = await notificationService.insertNotification(userId,"User "+ req.user.id + " liked your post")
            const likeData = { liker: req.user.id, postId };
            const isLiked = await likePostService.isLikedPost(likeData);
            if (isLiked) {
                return badRequest('You are already liked by this post', res);
            }
            const likePost = await likePostService.likePost(likeData);
            if (likePost) {
                return res.status(200).json({
                    err: 0,
                    mes: 'Like post successfully',
                });
            }
            return badRequest('Unknow error', res);
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async unlikePost(req, res) {
        try {
            const { postId } = req.params;
            const likeData = { liker: req.user.id, postId };
            const isLiked = await likePostService.isLikedPost(likeData);
            if (!isLiked) {
                return badRequest("You haven't liked this post yet.", res);
            }
            const resp = await likePostService.unlikePost(likeData);
            return res.status(200).json({
                err: 0,
                mes: 'Unlike post successfully',
            });
        } catch (error) {
            return internalServerError(res);
        }
    }
    async sharePost(req, res) {
        try {
            const { postId } = req.params;
            const resp = await postServices.sharePost(postId);
            if (resp) {
                return res.status(200).json({
                    err: 0,
                    mes: 'Share post successfully',
                });
            }
            return badRequest('Unknow error', res);
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }

    async getPostById(req, res) {
        try {
            const postList = await postServices.getPosts(
                req.params.postId,
                req.query,
                req
            );
            if (postList.posts[0])
                return res.status(200).json({
                    err: 0,
                    mes: '',
                    post: postList.posts[0],
                });
            else return badRequest('Not found post', res);
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async handleGetPosts(req, res, type) {
        try {
            if (req.params.userId) req.query.userId = req.params.userId;
            const posts = await postServices.getPosts(
                req.params.postId,
                type,
                req.query,
                req
            );
            return res.status(200).json({
                err: 0,
                mes: '',
                ...posts,
            });
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }

    async getPosts(req, res) {
        return new PostController().handleGetPosts(req, res, 'all');
    }

    async getFriendPosts(req, res) {
        return new PostController().handleGetPosts(req, res, 'friends');
    }

    async getFollowingPosts(req, res) {
        return new PostController().handleGetPosts(req, res, 'following');
    }

    async removeFileIfErr(
        postId,
        thumnailUpload,
        videoUploadMain,
        video,
        thumnail
    ) {
        if (postId) await postServices.deletePost(postId);
        if (thumnailUpload)
            await UploadFile.removeFromGGDriver(thumnailUpload.id);
        if (videoUploadMain)
            await UploadFile.removeFromCloudinary(
                process.env.VIDEO_TYPE_FILE,
                videoUploadMain.id
            );
        if (video) fs.unlink(video.path, () => {});
        if (thumnail) fs.unlink(thumnail.path, () => {});
    }

    async handleVideoUpload(video) {
        const videoBuffer = await UploadFile.getBufferFileWithPath(video.path);
        return await UploadFile.uploadToCloudinary(
            videoBuffer,
            process.env.VIDEO_TYPE_FILE,
            process.env.CLOUDINARY_FOLDER_VIDEO
        );
    }

    async handleThumbnailUpload(thumnail, postId, videoPath) {
        if (thumnail) {
            if (!thumnail.mimetype.includes('image'))
                throw new Error('Field thumnail must be image type');
            const thumnailUpload = await UploadFile.uploadToGGDriver(
                thumnail,
                `thumnailPost${postId}`,
                process.env.GG_DRIVE_FOLDER_THUMNAIL_ID
            );
            fs.unlink(thumnail.path, () => {});
            return thumnailUpload;
        } else {
            const thumnailBuffer = await FfmpegUtil.captureVideo(videoPath);
            const thumnailFile = {
                buffer: thumnailBuffer,
                mimeType: 'image/jpeg',
            };
            return await UploadFile.uploadToGGDriver(
                thumnailFile,
                `thumnailPost${postId}`,
                process.env.GG_DRIVE_FOLDER_THUMNAIL_ID
            );
        }
    }

    async upload(req, res) {
        // init variables

        let postId;
        let thumnailUpload;
        let videoUploadMain;
        let video;
        let thumnail;
        // open transaction
        const t = await sequelize.transaction();
        try {
            const { files } = req;
            const poster = req.user.id;
            const { title, visibility } = req.body;
            // Validate fields
            if (
                !title ||
                visibility === undefined ||
                ![
                    VISIBILITY_POST_FRIEND,
                    VISIBILITY_POST_PUBLIC,
                    VISIBILITY_POST_PRIVATE,
                ].includes(visibility)
            ) {
                return badRequest(
                    'Please enter full field and valid visibility value',
                    res
                );
            }
            // Validate file size
            for (const file of files) {
                if (
                    file.size / (1024 * 1024) >
                    process.env.LIMIT_FILE_SIZE_UPLOAD
                ) {
                    return badRequest(
                        `Cannot upload file with size more than ${process.env.LIMIT_FILE_SIZE_UPLOAD}mb`,
                        res
                    );
                }
            }
            // Get file video and thumnail
            video = files.find((file) => file.fieldname === 'video');
            thumnail = files.find((file) => file.fieldname === 'thumnail');
            // Validate video file
            if (
                !video ||
                !['video/mp4', 'video/m4v', 'video/mov'].includes(
                    video.mimetype
                )
            ) {
                return badRequest('Field video must be video type', res);
            }
            // Insert post to get postId
            const post = await postServices.insertPost({
                poster,
                title,
                visibility,
            });
            postId = post.id;
            // Handle upload thumbnail to gg driver
            thumnailUpload = await new PostController().handleThumbnailUpload(
                thumnail,
                postId,
                video.path
            );
            // handle upload video file to cloudinary
            videoUploadMain = await new PostController().handleVideoUpload(
                video
            );
            // update field video and thumbnail url
            await postServices.updatePost(post.id, {
                videoId: videoUploadMain.id,
                videoUrl: videoUploadMain.url,
                thumnailId: thumnailUpload.id,
                thumnailUrl: thumnailUpload.url,
            });
            await t.commit();
            const postUpdated = await postServices.getOne(post.id);
            return res.status(200).json(postUpdated);
        } catch (error) {
            await t.rollback();
            console.error(error);
            // Remove file in upload folder if some error occurred
            await new PostController().removeFileIfErr(
                postId,
                thumnailUpload,
                videoUploadMain,
                video,
                thumnail
            );
            return internalServerError(res);
        }
    }
    async removePost(req, res) {
        const removeFile = await UploadFile.removeFromGGDriver(
            req.body.thumnailId
        );
        return res.json(data);
    }
}
export default new PostController();
