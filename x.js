const Web3 = require('web3');

// RPC URL
const RPC_URL = "https://odyssey.storyrpc.io";
const web3 = new Web3(RPC_URL);

// Contract Details
const CONTRACT_ADDRESS = "0xb65F6D4ae63F9B32fF080A1D5a7ab114687840b1"; // Deployed contract address
const ABI = [
  {
    "inputs": [{"internalType": "address","name": "spender","type": "address"}],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Private Key
const PRIVATE_KEY = "Private key"; // Replace with your private key
const ETH_CONTRACT_ADDRESS = "0x1C13B2B65d55dF06FF43528E736Db2F8e372E692"; // Provided ETH Contract Address

// Get Wallet Address from Private Key
const MY_ADDRESS = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY).address;

// Contract Instance
const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

// Approve Function Call with Delay
async function approveTokens() {
    try {
        let nonce = await web3.eth.getTransactionCount(MY_ADDRESS, 'latest'); // Get current nonce

        for (let i = 0; i < 10; i++) {
            const gasPrice = await web3.eth.getGasPrice(); // Get current gas price

            const tx = {
                from: MY_ADDRESS,
                to: CONTRACT_ADDRESS,
                gas: 200000,
                gasPrice: gasPrice, // Use dynamic gas price
                nonce: nonce++, // Increment nonce for each transaction
                data: contract.methods.approve(ETH_CONTRACT_ADDRESS).encodeABI(),
            };

            const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
            const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            console.log(`Transaction ${i + 1} successful:`, receipt.transactionHash);

            // Print message after each transaction
            console.log(`Transaction ${i + 1} completed successfully!`);

            // 2 second delay between each transaction
            await new Promise(resolve => setTimeout(resolve, 2000)); // 2000 ms = 2 seconds
        }
    } catch (error) {
        console.error("Error while approving tokens:", error);
    }
}

approveTokens();
