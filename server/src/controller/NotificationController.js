import { badRequest, internalServerError } from '../utils/handleResp';
import * as notificationServices from '../services/notification';
class NotificationController {
    async getNotifies(req, res) {
        try {
            const { userId } = req.params;
            const resp = await notificationServices.getNotificationsByUserId(
                userId,
                req.query
            );
            return res.status(200).json({
                err: 0,
                mes: '',
                ...resp,
            });
        } catch (error) {
            return internalServerError(res);
        }
    }
    async seenNotify(req, res) {
        try {
            const resp = await notificationServices.seenNotification();
            if (resp)
            return res.status(200).json({
                err: 0,
                mes: '',
            });
            else return badRequest("Some error occured",res)
        } catch (error) {
            return internalServerError(res);
        }
    }
    async insertNotify(req, res) {
        try {
            const { userId } = req.params;
            const { content } = req.body;
            const resp = await notificationServices.insertNotification(
                userId,
                content
            );
            return res.status(200).json({
                err: 0,
                mes: 'Sent notification to user ' + userId,
            });
        } catch (error) {
            return internalServerError(res);
        }
    }
    async removeNotify(req, res) {
        try {
            const { notifyId } = req.params;
            const resp = await notificationServices.removeNotification(
                notifyId
            );
            return res.status(200).json({
                err: 0,
                mes: 'Removed notfifycation',
            });
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
}
export default new NotificationController();
