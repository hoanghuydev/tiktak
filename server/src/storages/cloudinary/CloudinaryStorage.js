import path from 'path';
const { Stream } = require('stream');
const cloudinary = require('cloudinary').v2;
class CloundinaryStorage {
    auth = () => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_DB_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        });
    };
    async upload(fileBuffer, typeFile, folderName) {
        this.auth();
        return new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    { folder: folderName, resource_type: typeFile },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            const data = {
                                id: result.public_id,
                                url: result.url,
                            };
                            resolve(data);
                        }
                    }
                )
                .end(fileBuffer);
        });
    }
    async remove(typeFile, ...fileIds) {
        this.auth();
        await cloudinary.api.delete_resources([...fileIds], {
            type: 'upload',
            resource_type: typeFile,
        });
    }
}
export default new CloudinaryStorage();
