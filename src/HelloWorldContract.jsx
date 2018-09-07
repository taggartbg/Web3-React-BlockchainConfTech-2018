import React, { Component } from 'react'
import { withWeb3, withAccount } from './Web3.jsx'

const HelloWorldContractContext = React.createContext({})

class HelloWorldContractWrapper extends Component {
    state = {}

    componentDidMount() {
        // This is the address on the Ropsten TestNet
        const contractAddress = "0x05095b161d8befa6e7704688a982f8a3dc43fb42"
        const ABI = [
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

        const myContract = new this.props.web3.eth.Contract(ABI, contractAddress)

        if (myContract) {
            this.setState({ contractAddress, myContract }, function () {
                this.getMessage()
            })
        }
    }

    getMessage = () => {
        if (this.state.myContract) {
            return this.state.myContract
                .methods
                .message()
                .call({ from: this.props.account })
                .then(res => {
                    this.setState({ message: res })
                })
        }
    }

    setMessage = (newMessage) => {
        if (this.state.myContract) {
            const transactionObj = {
                from: this.props.account,
                to: this.state.contractAddress,
                gas: 100000
            }

            return this.state.myContract
                .methods
                .changeMessage(`Hello, ${newMessage}`)
                .send(transactionObj)
                .then(res => {
                    console.log("Transaction Obj: ", res)
                    this.getMessage()
                })
        }
    }

    render() {
        const contextValue = {
            message: this.state.message,
            setMessage: this.setMessage
        }

        return (
            <HelloWorldContractContext.Provider value={contextValue}>
                {this.props.children}
            </HelloWorldContractContext.Provider>
        )
    }
}

const HelloWorldContractConsumer = HelloWorldContractContext.Consumer
export { HelloWorldContractConsumer }
export default withWeb3(withAccount(HelloWorldContractWrapper))