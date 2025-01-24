const { Web3 } = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

class Web3Service {
  async createWallet() {
    try {
      const account = web3.eth.accounts.create();
      return {
        address: account.address,
        privateKey: account.privateKey,
      };
    } catch (error) {
      throw new Error(`Failed to create wallet: ${error.message}`);
    }
  }

  async signMessage(privateKey, message = "Authentication message") {
    try {
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      return web3.eth.accounts.sign(message, privateKey);
    } catch (error) {
      throw new Error(`Failed to sign message: ${error.message}`);
    }
  }

  async getBalance(address) {
    try {
      const balance = await web3.eth.getBalance(address);
      return web3.utils.fromWei(balance, "ether");
    } catch (error) {
      throw new Error(`Failed to get balance: ${error.message}`);
    }
  }

  async transfer(privateKey, toAddress, amount) {
    try {
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      const nonce = await web3.eth.getTransactionCount(account.address);
      const gasPrice = await web3.eth.getGasPrice();

      const tx = {
        from: account.address,
        to: toAddress,
        value: web3.utils.toWei(amount.toString(), "ether"),
        gas: "21000",
        gasPrice: gasPrice,
        nonce: nonce,
      };

      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
      return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    } catch (error) {
      throw new Error(`Failed to transfer: ${error.message}`);
    }
  }
}

module.exports = new Web3Service();
