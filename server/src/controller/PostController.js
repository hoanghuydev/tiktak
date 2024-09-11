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
            console.log("Poster ",userId)
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
    async getPosts(req, res) {
        try {
            if (req.params.userId) req.query.userId = req.params.userId;
            const posts = await postServices.getPosts(
                req.params.postId,
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

    async upload(req, res) {
        let postId;
        let thumnailUpload;
        let videoUploadMain;
        let video;
        let thumnail;
        async function removeFileIfErr() {
            if (postId) await postServices.deletePost(postId);
            if (thumnailUpload)
                await UploadFile.removeFromGGDriver(thumnailUpload.id);
            if (videoUploadMain)
                await UploadFile.removeFromCloudinary(
                    process.env.VIDEO_TYPE_FILE,
                    videoUploadMain.id
                );
            if (video) fs.unlink(video.path);
            if (thumnail) fs.unlink(thumnail.path);
        }
        try {
            const { files } = req;
            const poster = req.user.id;
            const { title } = req.body;
            const visibility = parseInt(req.body.visibility);

            if (
                !title ||
                visibility == undefined ||
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
            for (const file of files) {
                if (file.size / (1024 * 1024) > 80)
                    return badRequest(
                        'Cannot upload file with size more than 80mb',
                        res
                    );
            }
            video = files.filter((file) => file.fieldname == 'video')[0];
            if (!video) {
                return badRequest('Please provide a video', res);
            }
            console.log(video.mimetype)
            if (
                !['video/mp4', 'video/m4v', 'video/mov'].includes(
                    video.mimetype
                )
            )
                return badRequest('Field video must be video type', res);
            thumnail = files.filter((file) => file.fieldname == 'thumnail')[0];
            const post = await postServices.insertPost({
                poster,
                title,
                visibility,
            });
            postId = post.id;
            if (thumnail) {
                if (!thumnail.mimetype.includes('image'))
                    return badRequest('Field thumnail must be image type', res);
                thumnailUpload = await UploadFile.uploadToGGDriver(
                    thumnail,
                    'thumnailPost' + post.id,
                    process.env.GG_DRIVE_FOLDER_THUMNAIL_ID
                );
                fs.unlink(thumnail.path, function (err) {
                    if (err) {
                        removeFileIfErr();
                        thumnail = null;
                    }
                });
            } else {
                const thumnailBuffer = await FfmpegUtil.captureVideo(
                    video.path,
                    res
                );
                const thumnailFile = {
                    buffer: thumnailBuffer,
                    mimeType: 'image/jpeg',
                };
                thumnailUpload = await UploadFile.uploadToGGDriver(
                    thumnailFile,
                    'thumnailPost' + post.id,
                    process.env.GG_DRIVE_FOLDER_THUMNAIL_ID
                );
            }
            const videoBuffer = await UploadFile.getBufferFileWithPath(
                video.path
            );
            videoUploadMain = await UploadFile.uploadToCloudinary(
                videoBuffer,
                process.env.VIDEO_TYPE_FILE,
                process.env.CLOUDINARY_FOLDER_VIDEO
            );
            fs.unlink(video.path, function (err) {
                if (err) {
                    removeFileIfErr();
                    video = null;
                }
            });
            await postServices.updatePost(post.id, {
                videoId: videoUploadMain.id,
                videoUrl: videoUploadMain.url,
                thumnailId: thumnailUpload.id,
                thumnailUrl: thumnailUpload.url,
            });
            const postUpdated = await postServices.getOne(post.id);
            return res.status(200).json(postUpdated);
        } catch (error) {
            console.log(error);
            try {
                removeFileIfErr();
            } catch (err) {
                return internalServerError(res);
            }
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
