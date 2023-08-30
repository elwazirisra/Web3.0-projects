// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  //get example accounts
  const [owner, sender1, sender2, sender3] = await hre.ethers.getSigners();
  
  
  //get the contract to deploy and deploy
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();
   await buyMeACoffee.deployed();
   console.log("BuyMeACoffee contract deployed to: ", buyMeACoffee.address)
  
  //check balances before coffee purchase
  const addresses = [owner.address, sender1.address, buyMeACoffee.address];
  console.log("===start===");
  await printBalances(addresses);
  //Buy the owner a few coffees
  const tip = {value: hre.ethers.utils.parseEther("1")};

  await buyMeACoffee.connect(sender1).buyCoffee("Ali",  "Hi Isra",tip);
  await buyMeACoffee.connect(sender2).buyCoffee("Esmail", "you are the best" , tip);
  await buyMeACoffee.connect(sender3).buyCoffee("Hassan", "what an amazing person", tip);

  //check balances after the coffees were purchased
  console.log("=== bought coffee ===");
  await printBalances(addresses);

  //withdraw funds
  await buyMeACoffee.connect(owner).withdrawTips();

  //check balance after withdraw
  console.log("=== withdraw ====");
  await printBalances(addresses);

  //read all the memos
  console.log("== memos ==");
  const memos =  await buyMeACoffee.getMemos();
  printMemos(memos);

  
  
  
  }
  //returns the balance of the given address
  async function getBalance(address){
     const balanceBigInt = await hre.ethers.provider.getBalance(address);
     return hre.ethers.utils.formatEther(balanceBigInt);
  }

  async function printMemos(memos){
    for(const memo of memos){
      const timestamp = memo.timestamp;
      const message = memo.message;
      const senderAddress = memo.from;
      const name = memo.name;
      console.log(`At ${timestamp}, ${name} ${senderAddress} said: ${message}`);

    }
     
  }
  async function printBalances(addresses){
    let index = 0;
     for(const address of addresses){
       console.log(`Address ${index} balance: `, await getBalance(address));
       index++;
     }
    }
  
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  
  

  

 

