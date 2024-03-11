import React, { useEffect, useState } from 'react'
import { Contract } from 'ethers'
import contractABI from '../contract/ABI.json'

const SmartContract = ({ userData }) => {
    const [inputValue, setInputValue] = useState('')
    const [smartContractValue, setSmartContractValue] = useState(0)
    const [isTransactionPending, setIsTransactionPending] = useState(false)
    const contractAddress = "0xdD87Ce27aaFC2e2E283c95FBb0547d7Cc0243720"

    useEffect(() => {
        if (userData.provider) {
            getContractValue()
        }
    }, [userData.provider])

    const getContractValue = async () => {
        try {
            const contract = new Contract(contractAddress, contractABI, userData.provider)
            const storedValue = await contract.get()
            setSmartContractValue(storedValue.toString())
        } catch (error) {
            console.error('Error getting contract value:', error)
        }
    }

    const setContractValue = async () => {
        try {
            setIsTransactionPending(true)
            const contract = new Contract(contractAddress, contractABI, userData.signer)
            const tx = await contract.set(inputValue)
            const txHash = tx.hash
            await tx.wait()
            const newValue = await contract.get()
            setSmartContractValue(newValue.toString())
        } catch (error) {
            console.log('error setting contract value:', error)
        } finally {
            setIsTransactionPending(false)
        }
    }
    
    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    return (
        <div className="bg-gray-100 rounded-lg shadow-md p-6 mx-2 max-w-md">
            <p className="text-xl font-bold mb-4">Value Stored in <a href="https://sepolia.etherscan.io/address/0xdD87Ce27aaFC2e2E283c95FBb0547d7Cc0243720" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>Smart Contract</a>:</p>
            <div className="mb-4">
                <p className="text-lg mb-2"><span className="font-semibold">Value:</span> {smartContractValue}</p>
            </div>
            <div className="flex items-center">
                <input type='text' value={inputValue} onChange={handleInputChange} className="border border-gray-300 py-2 px-4 rounded-md mr-2 focus:outline-none focus:border-indigo-500 flex-grow" />
                <button onClick={setContractValue} disabled={isTransactionPending} className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300">Set Value</button>
                {isTransactionPending && <p className="text-sm ml-2 text-gray-600">please wait...</p>}
            </div>
        </div>
    )
}

export default SmartContract
