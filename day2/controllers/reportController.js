const db = require("../models");
const { Op } = require("sequelize");

exports.getSales = async (req, res) => {
  try {
    const { month, year, from_date, to_date } = req.query;
    let whereClause = {};

    if (month && year) {
      whereClause = db.sequelize.literal(
        `MONTH(created_at) = ${month} AND YEAR(created_at) = ${year}`
      );
    } else if (from_date && to_date) {
      const startDate =
        new Date(from_date) < new Date(to_date) ? from_date : to_date;
      const endDate =
        new Date(from_date) < new Date(to_date) ? to_date : from_date;
      whereClause = {
        created_at: {
          [Op.between]: [startDate, endDate],
        },
      };
    }

    const result = await db.Order.findOne({
      attributes: [
        [db.sequelize.fn("SUM", db.sequelize.col("amount")), "total_amount"],
      ],
      where: whereClause,
    });

    res.json({ total_amount: result.get("total_amount") || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMonthlySales = async (req, res) => {
  try {
    const { year } = req.query;
    const results = await db.Order.findAll({
      attributes: [
        [db.sequelize.fn("MONTH", db.sequelize.col("created_at")), "month"],
        [db.sequelize.fn("SUM", db.sequelize.col("amount")), "amount"],
      ],
      where: db.sequelize.literal(`YEAR(created_at) = ${year}`),
      group: [db.sequelize.fn("MONTH", db.sequelize.col("created_at"))],
      having: db.sequelize.literal("amount > 0"),
      order: [
        [db.sequelize.fn("MONTH", db.sequelize.col("created_at")), "ASC"],
      ],
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserSales = async (req, res) => {
  try {
    const { year, user_id } = req.query;
    const results = await db.Order.findAll({
      attributes: [
        [db.sequelize.fn("MONTH", db.sequelize.col("created_at")), "month"],
        [db.sequelize.fn("SUM", db.sequelize.col("amount")), "amount"],
      ],
      where: {
        user_id,
        [Op.and]: [db.sequelize.literal(`YEAR(created_at) = ${year}`)],
      },
      group: [db.sequelize.fn("MONTH", db.sequelize.col("created_at"))],
      having: db.sequelize.literal("amount > 0"),
      order: [
        [db.sequelize.fn("MONTH", db.sequelize.col("created_at")), "ASC"],
      ],
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getShippingDockSales = async (req, res) => {
  try {
    const { year, shipping_dock_id } = req.query;
    const results = await db.Transaction.findAll({
      attributes: [
        [db.sequelize.fn("MONTH", db.sequelize.col("created_at")), "month"],
        [db.sequelize.fn("SUM", db.sequelize.col("amount")), "amount"],
      ],
      where: {
        shipping_dock_id,
        [Op.and]: [db.sequelize.literal(`YEAR(created_at) = ${year}`)],
      },
      group: [db.sequelize.fn("MONTH", db.sequelize.col("created_at"))],
      having: db.sequelize.literal("amount > 0"),
      order: [
        [db.sequelize.fn("MONTH", db.sequelize.col("created_at")), "ASC"],
      ],
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserOrderCount = async (req, res) => {
  try {
    const { year, user_id } = req.query;
    const results = await db.Order.findAll({
      attributes: [
        [db.sequelize.fn("MONTH", db.sequelize.col("created_at")), "month"],
        [db.sequelize.fn("COUNT", db.sequelize.col("id")), "order_count"],
      ],
      where: {
        user_id,
        [Op.and]: [db.sequelize.literal(`YEAR(created_at) = ${year}`)],
      },
      group: [db.sequelize.fn("MONTH", db.sequelize.col("created_at"))],
      order: [
        [db.sequelize.fn("MONTH", db.sequelize.col("created_at")), "ASC"],
      ],
    });

    // Create array with all months, defaulting to 0 orders
    const monthlyOrders = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      order_count: 0,
    }));

    // Update counts for months with orders
    results.forEach((result) => {
      const month = result.get("month");
      monthlyOrders[month - 1].order_count = parseInt(
        result.get("order_count")
      );
    });

    res.json(monthlyOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add other report controller methods here...
