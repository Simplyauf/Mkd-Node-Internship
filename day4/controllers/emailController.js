const db = require("../models");
const Email = db.Email;

exports.getAll = async (req, res) => {
  try {
    const emails = await Email.findAll();
    res.json(emails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const email = await Email.findByPk(req.params.id);
    if (!email) {
      return res.status(404).json({ error: "Email template not found" });
    }
    res.json(email);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { slug, subject, body, status } = req.body;
    const email = await Email.create({
      slug,
      subject,
      body,
      status: status || 1,
    });
    res.status(201).json(email);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const email = await Email.findByPk(req.params.id);
    if (!email) {
      return res.status(404).json({ error: "Email template not found" });
    }
    const { slug, subject, body, status } = req.body;
    await email.update({
      slug,
      subject,
      body,
      status,
    });
    res.json(email);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const email = await Email.findByPk(req.params.id);
    if (!email) {
      return res.status(404).json({ error: "Email template not found" });
    }
    await email.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
