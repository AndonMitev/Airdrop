import { useEffect, useState } from 'react';

import {
  Routes,
  Route,
} from "react-router-dom";

import Codes from './Codes';
import Mint from './Mint';

import './App.css';


function App() {
  const [metamask, setMetamask] = useState();
  const [account, setAccount] = useState();


  useEffect(() => {
    setMetamask(window.ethereum)
  }, [])

  useEffect(() => {
    (async () => {
      if (!metamask) return

      if (!localStorage.getItem('address')) {
        await metamask.request({ method: 'eth_requestAccounts' });
        const selectedAddress = metamask.selectedAddress
        localStorage.setItem('address', selectedAddress)

        setAccount(selectedAddress)
      }

      setAccount(localStorage.getItem('address'))


      metamask.on('accountsChanged', function () {
        const selectedAddress = metamask.selectedAddress

        localStorage.setItem('address', selectedAddress)

        setAccount(selectedAddress)
      });
    })()
  }, [metamask])



  return (
    <div className="App">
      <p>Address: {account}</p>



      <Routes>
        <Route path="/" element={< Codes />}></Route>
        <Route path="/mint" element={<Mint account={account} />} />
      </Routes>
    </div>
  );
}

export default App;
