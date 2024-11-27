import { badRequest, internalServerError } from '../utils/handleResp';
import * as notificationServices from '../services/notification';
class NotificationController {
    async getNotifies(req, res, next) {
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
            next(error);
        }
    }
    async seenNotify(req, res, next) {
        try {
            const resp = await notificationServices.seenNotification();
            if (resp)
                return res.status(200).json({
                    err: 0,
                    mes: '',
                });
            else return badRequest('Some error occured', res);
        } catch (error) {
            next(error);
        }
    }
    async insertNotify(req, res, next) {
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
            next(error);
        }
    }
    async removeNotify(req, res, next) {
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
            next(error);
        }
    }
}
export default new NotificationController();
