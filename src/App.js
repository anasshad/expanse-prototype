import { useState } from "react";
import Web3 from "web3";

import "./styles.css";
import ABI from "./abi.json";

export default function App() {
  const [balance, setBalance] = useState(null);
  const userAddress = "0x19b2a627Dd49587E021290b3eEF38ea8DE541eE5";
  const contractAddress = "0x41c62a91FDe9f192403bF8DBf50aA5f6Ac9aB96d";

  async function connectWallet() {
    let web3Provider = null;

    if (window.ethereum) {
      web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        alert("You must connect your metamask wallet !");
        console.error("User denied account access to metamask.");
        return;
      }
    } else {
      // you cant connect
      console.error("Unable to connect to metamask");
      alert(
        "You have to use Trustwallet or install Metamask to use this service, you can install it from :  https://metamask.io/download.html"
      );
      return;
    }
    let web3 = new Web3(window.ethereum);
    return web3;
  }

  async function getBalance() {
    let _web3 = await connectWallet();
    let myContract = new _web3.eth.Contract(ABI, contractAddress);
    let bal = await myContract.methods.balanceOf(userAddress).call();
    setBalance(bal / 10000000000);
  }

  return (
    <div className="App">
      <button onClick={getBalance}>Get Balance</button>
      {balance && <div>user balance: {balance} </div>}
    </div>
  );
}
