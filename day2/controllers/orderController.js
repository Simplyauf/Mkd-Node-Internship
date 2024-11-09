const db = require("../models");
const { Op } = require("sequelize");

exports.getOddOrders = async (req, res) => {
  try {
    const orders = await db.Order.findAll({
      where: {
        id: {
          [Op.and]: [{ [Op.gt]: 0 }, db.sequelize.literal("id % 2 = 1")],
        },
      },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const sort = req.query.sort || "id";
    const direction = (req.query.direction || "ASC").toUpperCase();

    const { count, rows } = await db.Order.findAndCountAll({
      limit,
      offset,
      order: [[sort, direction]],
    });

    res.json({
      total: count,
      page: page,
      list: rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCursorPagination = async (req, res) => {
  try {
    const cursorId = parseInt(req.query.id) || 0;
    const limit = parseInt(req.query.limit) || 10;

    const orders = await db.Order.findAll({
      where: {
        id: {
          [Op.gt]: cursorId,
        },
      },
      limit,
      order: [["id", "ASC"]],
    });

    res.json({
      id: cursorId,
      list: orders,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
