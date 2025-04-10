const nodemailer = require("nodemailer");
const config = require("config");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      host: config.get("smtp_host"),
      port: config.get("smtp_port"),
      secure: false,
      auth: {
        user: config.get("smtp_user"),
        pass: config.get("smtp_password"),
      },
    });
  }

  async sendActivationMail(toEmail, link) {
    try {
      await this.transporter.sendMail({
        from: config.get("smtp_user"),
        to: toEmail,
        subject: "Activate the equipment lease project",
        text: "",
        html: `<div>
         <h3>Hisobni faollashtirish uchun quyidagi havolani bosing</h3>
         <a href=${link}>faollashtirish</a>
        </div>`,
      });
    } catch (error) {
      console.error("Error sending activation mail:", error);
    }
  }
}

module.exports = new MailService();
