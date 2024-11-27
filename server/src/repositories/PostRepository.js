import db from '@models';
import AbstractRepository from './AbstractRepository';
class PostRepository extends AbstractRepository {
    contructor() {
        super(db.Post);
    }
}
export default new PostRepository();
