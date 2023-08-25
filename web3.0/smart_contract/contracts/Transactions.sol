//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

//NOTES:
//a timestamp represents the exact moment in time that a block was mined and validated by a blockchain network.
//payable keyword it enables a function or contract to receive incoming transactions containing ether.
//Variables declared in the memory are not persisted on the blockchain; they exist only during the execution of a function and are cleared after the function's execution is complete



contract Transactions{
    uint256 transactionCount;

    event Transfer(address from, address receiver, uint256 amount, string message, uint256 timeStamp, string keyword);

//These are the properties our transaction needs to have
    struct TransferStruct {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }
    //we want to store all the transaction.. so we will store all the transaction sin an array
    TransferStruct[] transactions; //our array is called transactions and is of type TransferStruct

    function addToBlockchain(address payable reciever, uint256 amount, string memory message, string memory keyword) public {
       transactionCount += 1;
       transactions.push(TransferStruct(msg.sender, reciever, amount, message, block.timestamp, keyword));

       //to actually send the transaction we need to emit the transaction
       emit Transfer(msg.sender, reciever, amount, message, block.timestamp, keyword);
      

    }
    function getAllTransactions() public view returns(TransferStruct[] memory) {
    
        return transactions;
    }
    function getTransactionCount() public view returns(uint256){
         return transactionCount;
    }

}
