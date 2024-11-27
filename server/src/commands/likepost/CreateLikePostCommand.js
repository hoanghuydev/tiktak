import LikePostRepository from '@repositories/LikePostRepository';
class CreateLikePostCommand {
    async execute({ liker, postId }) {
        const likePost = await LikePostRepository.create({ liker, postId });
        if (!likePost)
            throw createHttpError.BadRequest(
                'Something went error when like post'
            );
        return likePost;
    }
}
export default new CreateLikePostCommand();
