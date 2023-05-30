const {createTransport} = require('nodemailer')
const { mail_password, mail_admin } = require('../config/config')

const transport = createTransport({
    service: 'gmail',
    port: 578,
    auth: {
        user: mail_admin,
        pass: mail_password
    }
})
let from = `Servicio de reset pass <${mail_admin}>`

const sendEmail = async ({userMail, subject, html}) => {
    return  await transport.sendMail({
        from,
        to: userMail,
        subject,
        html
        // attachments: []
    })
}

module.exports = {
    sendEmail
}
