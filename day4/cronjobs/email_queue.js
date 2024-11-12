const db = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");

async function queueEmails() {
  try {
    const users = await db.User.findAll({
      where: { status: 1 },
    });

    const today = moment();
    const isOddDay = [1, 3, 5].includes(today.day());

    const emails = await db.Email.findAll({
      where: {
        status: 1,
        id: {
          [Op.and]: [
            { [Op.gt]: 0 },
            db.sequelize.literal(`id % 2 = ${isOddDay ? "1" : "0"}`),
          ],
        },
      },
    });

    const tomorrow = moment().add(1, "days").startOf("day");
    const queueEntries = [];

    for (const email of emails) {
      for (const user of users) {
        queueEntries.push({
          email_id: email.id,
          user_id: user.id,
          status: 0, // not sent
          send_at: tomorrow.toDate(),
        });
      }
    }

    if (queueEntries.length > 0) {
      await db.EmailQueue.bulkCreate(queueEntries);
      console.log(`Successfully queued ${queueEntries.length} emails`);
    }
  } catch (error) {
    console.error("Error in email queue job:", error);
  }
}

(async function () {
  await queueEmails();
  process.exit(0);
})();
