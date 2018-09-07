import React, { Component } from 'react'

import './App.css'

import Web3Wrapper, { Web3Consumer } from './Web3.jsx'
import HelloWorldContractWrapper, { HelloWorldContractConsumer } from './HelloWorldContract.jsx'

// Uncomment this to use the base commands in the console
// import './commands.js'

class App extends Component {
  render() {
    return (
      <Web3Wrapper>
        <Web3Consumer>
          {({balance}) => <p>Current Balance: {balance}</p>}
        </Web3Consumer>
        <HelloWorldContractWrapper>
          <HelloWorldContractConsumer>
            {({setMessage, message}) => <MyHelloWorldComponent
                                          setMessage={setMessage}
                                          message={message} />}
          </HelloWorldContractConsumer>
        </HelloWorldContractWrapper>
      </Web3Wrapper>
    )
  }
}

class MyHelloWorldComponent extends Component {
  handleInput = (evt) => {
    this.setState({ input: evt.target.value })
  }

  handleSubmit = () => {
    this.props.setMessage(this.state.input)
  }

  render() {
    return (
      <div className="hello-world">
        <div>
          <input onChange={this.handleInput} />
          <button onClick={this.handleSubmit}>Say Hi!</button>
        </div>
        <div className="current-message">Current Message: {this.props.message || 'No Message'}</div>
      </div>
    )
  }
}

export default App;
