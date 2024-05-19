const nodemailer = require('nodemailer');

const { config } = require('../../../config/config');

class EmailService {
    constructor() {}

    async sendMail(email = {
      from: '"Development email" <demiancalleros1@gmail.com>',
      to: "demiancalleros1@gmail.com",
      subject: "This is a test email, please ignore",
      text: "",
      html: "",
    }) {

      let transporter = nodemailer.createTransport({
        host: config.emailService,
        port: 465,
        secure: true,
        auth: {
          user: config.email,
          pass: config.emailpassword,
        },
      });

      return await transporter.sendMail(email)
    }
}

module.exports = EmailService;
