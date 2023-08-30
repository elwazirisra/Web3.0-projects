import abi from '../JsonAbi/BuyMeCoffee.json';
import { ethers } from "ethers";
import  { useEffect, useState } from "react";
import "../App.css";






function Loader(){
   const contractAddress = "0xC9a5861Ca5c61560dbB0f036543FC8392134E0f7";
   const contractABI = abi.abi;

  

   //component state
   const [currentAccount, setCurrentAccount] = useState("");
   const [name, setName] = useState("");
   const [message, setMessage] = useState("");
   const [memos, setMemos] = useState([]);

   
   const onNameChange= (event)=>{
       setName(event.target.value);
   }

   const onMessageChange = (event) => {
    setMessage(event.target.value);
  }

  //wallet connection logic
  const checkIfWalletIsConnected = async()=>{
      try{
        const { ethereum } = window;
        const accounts = await ethereum.request({method: 'eth_accounts'});
        console.log("accounts ", accounts);

        if(accounts.length > 0){
            const account = accounts[0];
            console.log("wallet is connected! " + account);
      } else {
        console.log("make sure MetaMask is connected");
      }

      }
       catch (error) {
         console.log("error: ", error);
      }
  }

  const connectWallet= async()=>{
     try{
         const { ethereum } = window;
         if(!ethereum){
             console.log("Please install MetaMask");
         }

         const accounts = await ethereum.request({
             method: 'eth_requestAccounts'
         });
         setCurrentAccount(accounts[0]);
     }
     catch (error) {
        console.log(error);
      }
  }
  const buyCoffee=()=>{
      try{
          const {ethereum} = window;
          if(ethereum){
             const provider= new ethers.providers.Web3Provider(ethereum, "any");
             const signer = provider.getSigner();
             const buyMeCoffee = new ethers.Contract(contractAddress,contractABI,signer);
            
             console.log("Buying coffee..");
             const  coffeeTxn = buyMeCoffee.buyCoffee( name ? name : "anon",
             message ? message : "Enjoy your coffee!",
             {value: ethers.utils.parseEther("0.001")}
           );

           coffeeTxn.wait();
           console.log("mined ", coffeeTxn.hash);

           console.log("coffee purchased!");
         
          }
      }
      catch (error) {
        console.log(error);
      }
  }

  const buyLargeCoffee=()=>{
    try{
        const {ethereum} = window;
        if(ethereum){
           const provider= new ethers.providers.Web3Provider(ethereum, "any");
           const signer = provider.getSigner();
           const buyMeCoffee = new ethers.Contract(contractAddress,contractABI,signer);
          
           console.log("Buying coffee..");
           const  coffeeTxn = buyMeCoffee.buyCoffee( name ? name : "anon",
           message ? message : "Enjoy your coffee!",
           {value: ethers.utils.parseEther("0.005")}
         );

      coffeeTxn.wait();
       
  
        

         console.log("mined ", coffeeTxn.hash);

         console.log("coffee purchased!");


       
        }
    }
    catch (error) {
      console.log(error);
    }
}


  const getMemoss=()=>{
      try{
       
      const { ethereum } = window;
      if (ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const buyMeACoffee = new ethers.Contract(contractAddress, contractABI,signer);
       
        memos.push(buyMeACoffee.getMemos().then.then);
        const mem = buyMeACoffee.getMemos()
        for(let i=0 ; i<mem.length; i++){
          console.log(mem[i][9], "here");
        }
      
        console.log("fetching memos from the blockchain..", memos);
      
     
        console.log("fetched!");
        setMemos(memos);
        return(
          memos
        )
      
      }
        else {
            console.log("Please connect to metamask")
        }
    }
      catch(error){
       console.log(error);
      }
      
  };



  useEffect(() => {
    const contractABI = abi.abi;
    let buyMeACoffee;
    checkIfWalletIsConnected();
  

    // Create an event handler function for when someone sends
    // us a new memo.
   
    const {ethereum} = window;

    // Listen for new memo events.
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum, "any");
      const signer = provider.getSigner();
      buyMeACoffee = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

   
    }

 
    
  }, []);
   
    return(
        <div>
        
          <h1 className='App'> Buy Me A Coffee!</h1>
        
         {currentAccount ?(
             <div>
               <form className='App'>
                 <div>
                 <label className='App'>
                   Name
                 </label>
                 <br/>
                 <input
                 id='name'
                 type='text'
                 placeholder='your name'
                 onChange={onNameChange}
                 />
                </div>
                <br/>
                <div>
                  <label>
                  Send me a message
                  </label>
                  <br/>
                  <textarea
                  rows={3}
                  placeholder="Enjoy your coffee!"
                  id="message"
                  onChange={onMessageChange}
                  required
                ></textarea>
                </div>
                <div>
                  <button
                  type='button'
                  className='vertical'
                  onClick={buyCoffee}
                  >
                     Send 1 Small Coffee for 0.001ETH
                  </button>
           
                  <button
                  type='button'
                  className='vertical'
                  onClick={buyLargeCoffee}
                  >
                     Send 1 Large Coffee for 0.005ETH
                  </button>
                </div>
               </form>
               </div>
         ) : (
           <button type='button' className='vertical' onClick={connectWallet}>Connect your wallet </button>
         )}
        
            )
      
  
          </div>
    )

}
export default Loader;