class GoogleDriveStorage {
    KEYFILEPATH = path.join(__dirname, '../config/credentials.json');
    SCOPES = ['https://www.googleapis.com/auth/drive'];
    auth = new google.auth.GoogleAuth({
        keyFile: this.KEYFILEPATH,
        scopes: this.SCOPES,
    });
    async upload(file, fileName, folderId) {
        const bufferStream = new Stream.PassThrough();
        bufferStream.end(file.buffer);
        const { data } = await google
            .drive({
                version: 'v3',
                auth: this.auth,
            })
            .files.create({
                media: {
                    mimeType: file.mimeType,
                    body: bufferStream,
                },
                requestBody: {
                    name: fileName,
                    parents: [folderId],
                },
                fields: 'id',
            });
        return {
            id: data.id,
            url: `https://drive.usercontent.google.com/download?id=${data.id}&export=view&authuser=1`,
        };
    }
    async remove(fileId) {
        const data = await google
            .drive({
                version: 'v3',
                auth: this.auth,
            })
            .files.delete({
                fileId,
            });
        return data;
    }
}
export default new GoogleDriveStorage();
