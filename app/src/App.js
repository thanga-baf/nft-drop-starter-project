//storing the wallet data -> we will be using usestate
import React, { useEffect,useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from './CandyMachine';

// Constants
const TWITTER_HANDLE = 'prithivthanga';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  // storing the wallet data 
  // usestate has the details of wallet data
  const [walletAddress, setWalletAddress] = useState(null);

const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {

        /*
         * The solana object gives us a function that will allow us to connect
         * directly with the user's wallet!
         */

          console.log('Phantom wallet found!');
          const response = await solana.connect({ onlyIfTrusted: true });

          console.log("response from solana object - >",response);

          console.log("public key/ address derived from phanthom wallet ->",response.publicKey.toString());

          //setting the details which we got from usestate
          setWalletAddress(response.publicKey.toString());

        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };


   /*
   * Let's define this method so our code doesn't break.
   * We will write the logic for this next!
   */
   const connectWallet = async () => {
     console.log("clicking is woking but not logics present yet");
     const { solana } = window;

     if (solana) {
       const response = await solana.connect();
       console.log('wallet Connected with Public Key:', response.publicKey.toString());
       setWalletAddress(response.publicKey.toString());
     }
   };
   
   
     /*
   * We want to render this UI when the user hasn't connected
   * their wallet to our app yet.
   */
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to your Wallet
    </button>
  );

 // to check if the wallet is connected or not
 
 useEffect(() => {
  const onLoad = async () => {
    await checkIfWalletIsConnected();
  };
  window.addEventListener('load', onLoad);
  return () => window.removeEventListener('load', onLoad);
}, []);


  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Candy Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
                    {/* Render your connect to wallet button right here */}
                    {/* adding the below. if the wallet is not connect,
                    then the button 'Connect to wallet' will appear */}
                    {!walletAddress && renderNotConnectedContainer()}
        </div>
        {/* Check for walletAddress and then pass in walletAddress */}
      {walletAddress && <CandyMachine walletAddress={window.solana} />}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
