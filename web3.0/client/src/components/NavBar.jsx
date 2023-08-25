//JSX allows us to write HTML in React.
import { HiMenu, HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import logo from '../../imagess/logo.png';
import { useState } from 'react';

const NavBarItem = ({title, classProps})=> {
   return(
       <li className={`mx-4 cursor-pointer ${classProps}`}>
           {title}
       </li>
   )
}
const Navbar = () => {
    //a state to indicate wether the mobile navigation bar is currently open or not
    const [toggleMenu, setToggleMenu] = useState(false); 
    return(
        <nav className="w-full flex md:justify-center justify-between items-center p-4">
           <div className="md:flex-[0.5] flex-initial justify-center itmes-center" >
               <img src={logo} alt="logo" className="w-32 cursor-pointer"></img>
           </div>
           <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
            {[ <a href="https://coinmarketcap.com/" target="_blank">Market</a>, <a href="https://github.com/elwazirisra" target="_blank">GitHub</a>, <a href='https://ethereum.org/en/developers/docs/networks/#:~:text=about%20Mainnet%20ETH.-,Ethereum%20Testnets,environment%20before%20deployment%20to%20Mainnet' target="_blank">Testnets</a>,<a href="http://israelwazir.me/"target="_blank" >About me</a>].map((item, index)=> (
             <NavBarItem key={item + index} title={item} />
            ))}
           
           </ul>
           <div className="flex relative">
             {toggleMenu
               ? <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)}/> 

               : <HiMenuAlt4 fontSize={28} className="text-white  md:hidden cursor-pointer" onClick={()=> setToggleMenu(true)}/>
             }
             {toggleMenu && (//will only happen if toggle menu is true
                <ul
                  className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                  flex flex-col justify-start items-end rounded-md red-glassmorphism text-white animate-slide-in
                  ">
                <li className="text-xl w-full my-2">
                    <AiOutlineClose onClick={()=> setToggleMenu(false)} />
                </li>
                {["Market", "Exchange", "Wallets"].map((item, index)=> (
             <NavBarItem key={item + index} title={item} classProps="my-2 text-lg" />
            ))}
                </ul>
            )}
             
           </div>

        </nav>
    );
}
export default Navbar;