import { useState } from 'react'
import ConnectWallet from './components/ConnectWallet'
import WalletInfo from './components/WalletInfo'
import SmartContract from './components/SmartContract'

function App() {
  const [isConnected, setIsConnected] = useState(false)
  const [userData, setUserData] = useState({
    userAddress: '',
    userBalance: 0,
    provider: null,
    signer: '',
    network: '',
  });

  return (
    <div className="flex justify-center items-center h-screen">
      { !isConnected ? <ConnectWallet setIsConnected={setIsConnected} /> : 
      <>
        <WalletInfo userData={userData} setUserData={setUserData} />
        {userData.network === 'sepolia' ? <SmartContract userData={userData} /> : <div className="bg-red-500 text-white font-bold py-2 px-4 rounded">You need to change your network to Sepolia</div>}
      </> }
    </div>
  )
}

export default App
