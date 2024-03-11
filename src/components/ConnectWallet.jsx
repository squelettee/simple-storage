import React from 'react'

const ConnectWallet = (props) => {
    const connectWallet = async () => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' })
            props.setIsConnected(true)
        } catch (error) {
            console.error('Error connecting wallet:', error)
        }
    }
  return (
    <div className="p-4">
        <p className="text-center text-gray-700">Connect your wallet on Sepolia Network</p>
        <button onClick={connectWallet} className="block mx-auto mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Connect Wallet</button>
    </div>
  )
}

export default ConnectWallet