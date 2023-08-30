// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

//deployed to sepolia at 0xC9a5861Ca5c61560dbB0f036543FC8392134E0f7
contract BuyMeACoffee {
    //Event to emit when a memo is created
    event NewMemo(address from, uint256 timestamp, string name, string message );

    // Memo Struct
    struct Memo{
        address from;
        uint256 timestamp;
        string name;
        string message;
       }
       //address of contract deployer
    address payable owner;

    //List if all memos recieved from friends
     Memo[] memos;

     constructor(){
         owner = payable(msg.sender);
        
     }
     function changeAddress(address newAddressOwner) public payable{
         if(owner == msg.sender){
             owner= payable(newAddressOwner);
         }
     }


    //memory means we dont want to keep it around
     function buyCoffee(string memory _name, string memory _message) public payable{
         require(msg.value > 0, "can't buy coffee with 0 ETH");
         //add the memo to storage
        memos.push(Memo(msg.sender, block.timestamp, _name, _message ));

       //Emit a log event when a new memo is created
        emit NewMemo(msg.sender, block.timestamp, _name, _message );

     }

     //send entire balance stored in this contract to the owner
     function withdrawTips() public{
         require(owner.send(address(this).balance));
          
     }

     //retrieve all the memos stored in the blockchain
     function getMemos() public view returns(Memo[] memory) {
             return memos;
     }


    }
