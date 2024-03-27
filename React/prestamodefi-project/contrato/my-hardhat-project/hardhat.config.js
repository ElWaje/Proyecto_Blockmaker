require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const { PRIVATE_KEY, SEPOLIA_URL } = process.env;

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
