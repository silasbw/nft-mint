import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import '@celo-tools/use-contractkit/lib/styles.css'
import { Mainnet, ContractKitProvider } from '@celo-tools/use-contractkit'

import './firebase'

ReactDOM.render(
  <React.StrictMode>
    <ContractKitProvider
      dapp={{
        name: 'nft minter',
        description: 'nft minter',
        url: '',
        icon: '',
      }}
      network={Mainnet}
      networks={[Mainnet]}
    >
      <App />
    </ContractKitProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
