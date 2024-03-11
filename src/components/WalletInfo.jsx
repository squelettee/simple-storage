import React, { useEffect } from 'react'
import { ethers, formatEther } from 'ethers'

const WalletInfo = ({userData, setUserData}) => {

    useEffect(() => {
        fetchUserDetails();
    }, []);


    const fetchUserDetails = async () => {
        try {
            const ethProvider = new ethers.BrowserProvider(window.ethereum);
            const ethSigner = await ethProvider.getSigner();
            const network = await ethProvider.getNetwork();
    
            const address = await ethSigner.getAddress();
            const balance = await ethProvider.getBalance(address);
            const eth = formatEther(balance);
    
            setUserData({
                userAddress: address,
                userBalance: eth,
                provider: ethProvider,
                signer: ethSigner,
                network: network.name
            });
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    return (
<div className="bg-gray-100 rounded-lg shadow-md p-6 mx-4 max-w-md">
    <p className="text-lg font-semibold">You are connected</p>
    <p className="text-base mb-2">Address: {userData.userAddress}</p>
    <p className="text-base mb-2">Balance: {userData.userBalance} ETH</p>
    <p className="text-base mb-2">Network: {userData.network}</p>
</div>

    )
}

export default WalletInfo
