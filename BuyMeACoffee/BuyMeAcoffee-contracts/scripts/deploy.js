const hre = require("hardhat");

async function main(){
    //get the contract to deploy and deploy
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();
  await buyMeACoffee.deployed();
  console.log("BuyMeACoffee contract deployed to: ", buyMeACoffee.address)

}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  
  
