//https://eth-sepolia.g.alchemy.com/v2/furYIjrSjaPpLLdOCmRt8ICsnSfdmmWC

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/furYIjrSjaPpLLdOCmRt8ICsnSfdmmWC',
      accounts: ['ccfbb4fcfc478be3325d09ecd7b45e74da48b16dcd4758b98b252f0c15824990'],
    },
  },
};