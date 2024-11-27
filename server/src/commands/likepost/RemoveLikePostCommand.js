import LikePostRepository from '@repositories/LikePostRepository';
class RemoveLikePostCommand {
    async execute(likePostId) {
        const removed = await LikePostRepository.hardDelete({ id: likePostId });
    }
}
