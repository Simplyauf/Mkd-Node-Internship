const cron = require("node-cron");
const shopifyService = require("../services/shopifyService");
const db = require("../models");
const email = require("../../day4/models/email");

// Run every day at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Starting customer sync...");
    const customers = await shopifyService.getAllCustomers();

    for (const customer of customers) {
      await db.Customer.findOrCreate({
        where: { shopify_customer_id: customer.id.toString() },
        defaults: {
          shopify_customer_email: customer.email,
        },
      });
    }

    console.log("Customer sync completed");
  } catch (error) {
    console.error("Customer sync failed:", error);
  }
});
