const db = require("../models");
const nodemailer = require("nodemailer");
const moment = require("moment");
const { Op } = require("sequelize");

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER || "your_mailtrap_user",
    pass: process.env.MAILTRAP_PASS || "your_mailtrap_password",
  },
});

async function sendEmails() {
  try {
    const today = moment().startOf("day");
    const queuedEmails = await db.EmailQueue.findAll({
      where: {
        status: 0,
        send_at: {
          [Op.gte]: today.toDate(),
          [Op.lt]: moment(today).add(1, "days").toDate(),
        },
      },
      include: [
        {
          model: db.Email,
          as: "email",
          where: { status: 1 },
        },
        {
          model: db.User,
          as: "user",
          where: { status: 1 },
        },
      ],
    });

    for (const queueItem of queuedEmails) {
      const { email, user } = queueItem;

      const body = email.body
        .replace("{{{NAME}}}", user.name)
        .replace("{{{EMAIL}}}", user.email);

      try {
        await transporter.sendMail({
          from: '"Your App" <noreply@yourapp.com>',
          to: user.email,
          subject: email.subject,
          html: body,
        });

        await queueItem.update({ status: 1 });
        console.log(`Successfully sent email to ${user.email}`);
      } catch (error) {
        console.error(`Failed to send email to ${user.email}:`, error);
      }
    }

    console.log(`Completed sending ${queuedEmails.length} emails`);
  } catch (error) {
    console.error("Error in email sending job:", error);
  }
}

(async function () {
  await sendEmails();
  process.exit(0);
})();
