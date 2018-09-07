import Web3 from 'web3'

/*
 * This is a series of commands to understand how web3 works
 * 
 * Make sure to use these in order!
 * 1) connectWeb3()
 * 2) getAccountInfo()
 * 3) setUpContract()
 * 4) getMessage()
 * 5) setMessage(<String>)
 * 6) ...and then probably getMessage() again
 */


// Use Web3 v1...but connect to MetaMask
let web3, accounts, balance

window.connectWeb3 = () => {
    if (window.web3) {
        web3 = new Web3(window.web3.currentProvider)
    }
    console.log("Global Web3 Version: ", web3.version)
}


// Get account and balance info from MetaMask
window.getAccountInfo = () => {
    const getInfo = async () => {
        accounts = await web3.eth.getAccounts()
        balance = await web3.eth.getBalance(accounts[0])
    
        return { accounts, balance }
    }
    
    getInfo().then(console.log)
}


// Tell web3 about your contract
let myContract, contractAddress, ABI

window.setUpContract = () => {
    contractAddress = "0x05095b161d8befa6e7704688a982f8a3dc43fb42"
    ABI = [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_newMessage",
                    "type": "string"
                }
            ],
            "name": "changeMessage",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "message",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ]
    
    myContract = new web3.eth.Contract(ABI, contractAddress)
    console.log("My Contract: ", myContract)
}


// Make a non-mutative request
window.getMessage = () => {
    myContract
        .methods
        .message()
        .call({ from: accounts[0] })
        .then(res => {
            console.log("Current Message: ", res)
        })
}

// Change the state of the blockchain
window.setMessage = (newMessage) => {
    const transactionObj = {
        from: accounts[0],
        to: contractAddress,
        gas: 100000
    }
    
    myContract
        .methods
        .changeMessage(`Hello, ${newMessage}`)
        .send(transactionObj)
        .then(res => {
            console.log("Transaction Response: ", res)
        })
}