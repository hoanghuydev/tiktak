import nodemailer from 'nodemailer';
import createHttpError from 'http-errors';
class MailSerivce {
    async sendMail({ template, title, content, email }) {
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_APP_PASSWORD,
                },
            });
            const mailOptions = {
                from: process.env.EMAIL_ADDRESS,
                to: email,
                subject: title,
                html: mailTemplate(title, content),
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    reject({ err: 1, mes: 'Internal Server Error' });
                } else {
                    console.log('Send mail');
                    resolve({
                        err: 0,
                        mes: 'Email sent successfully',
                    });
                }
            });
        } catch (error) {
            throw createHttpError.BadRequest(
                'Error when send mail to ' + email
            );
        }
    }
}
export default new MailSerivce();
