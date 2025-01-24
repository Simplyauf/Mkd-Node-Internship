const db = require("../models");
const web3Service = require("../services/web3Service");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await db.User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    await user.destroy();
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createWallet = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.body.user_id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const wallet = web3Service.createWallet();
    await user.update({ wallet_id: wallet.address });

    res.json(wallet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.signUser = async (req, res) => {
  try {
    const signature = web3Service.signMessage(req.query.private_key);
    res.json(signature);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAccount = async (req, res) => {
  try {
    const account = web3.eth.accounts.privateKeyToAccount(
      req.query.private_key
    );
    const balance = await web3Service.getBalance(account.address);
    res.json({ address: account.address, balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.transfer = async (req, res) => {
  try {
    const { private_key, to_address, amount } = req.query;
    const result = await web3Service.transfer(private_key, to_address, amount);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
