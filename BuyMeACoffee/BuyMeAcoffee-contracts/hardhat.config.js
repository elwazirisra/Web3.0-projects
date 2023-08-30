require("@nomicfoundation/hardhat-toolbox");
//require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();


const SEPOLIA_URL= process.env.SEPOLIA_URL;
const PRIVATE_KEY= process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/KFi4RlbBttoyVjatJp5ilG4YtyY3T2KI",
      accounts: ["ccfbb4fcfc478be3325d09ecd7b45e74da48b16dcd4758b98b252f0c15824990"],
    },
  },
};
