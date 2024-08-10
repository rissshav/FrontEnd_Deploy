import { connectWallet , connectWalletLocaly,disconnectWallet,isWalletConnected,connectAccount,forcenetwork} from "../config";
import React,{ useState,useEffect } from "react";
import { createContext, useContext } from "react";

export const LoaderContext = createContext();


const ContextProvider = ({children}) => {

    const [loading,setloading] = useState(false);
    const [Edit,showEdit] = useState(false);
    const [Add,setAdd] = useState(false);
    const [show,setShow] = useState(false);
    const [showDiss,setShowDiss] = useState(false);
    const [account, setAccount] = useState("");
    const [balance,setBalance] = useState("");
    
    const loader = () => {
        setloading(!loading);
      }    

      const handleClose = () =>{
        showEdit(false);
        setAdd(false);
      };

      const handleShow = () => showEdit(true);
      const handelShow1 = () => setAdd(true);
    
      const connectMetawallet = async () => {
        setShow(false);
        const accounts = await connectWallet();
        setAccount(accounts[0]);
        await forcenetwork();
        if (!isWalletConnected()) {
          connectWalletLocaly();
        }
        
      }

      const isWalletAlreadyConnected = async () => {
        if (isWalletConnected()) {
          const accounts = await connectWallet();
          setAccount(accounts[0]);
         
        }
      };

      const disconnectWalletFromApp = () => {
        disconnectWallet();
        setAccount("");
        setShowDiss(false);     
      };

   
    return(
        <LoaderContext.Provider value={{loading,setloading,loader,Edit,showEdit,handleClose,handleShow,Add,handelShow1,show,setShow,connectMetawallet,account,showDiss,setShowDiss,isWalletAlreadyConnected,disconnectWalletFromApp}}>
          {children}
        </LoaderContext.Provider>
    )
}

export default ContextProvider




