import React from 'react'

import { useContractKit } from '@celo-tools/use-contractkit'
import { logEvent } from 'firebase/analytics'
import { Contract } from 'web3-eth-contract'

import '@celo-tools/use-contractkit/lib/styles.css'
import { Mainnet, ContractKitProvider } from '@celo-tools/use-contractkit'

import { nfts, NFT } from './nfts'
import { analytics } from './firebase'

function App() {
  const { connect, address, initialised, performActions } = useContractKit()

  const makeMint = (nft: NFT) => {
    return async () => {
      logEvent(analytics, 'mint_pressed', { name: nft.name })
      if (!address) {
        console.log('no address')
        return
      }

      if (!initialised) {
        console.log('not initialised')
        return
      }

      console.log(`mint for ${address}`)
      await performActions(async (kit) => {
        try {
          const gasPrice = await kit.web3.eth.getGasPrice()
          const contract = new kit.connection.web3.eth.Contract(
            nft.abi,
            nft.contractAddress,
          )
          const txObject = await nft.makeMintTransaction(contract, address)
          const tx = await kit.sendTransactionObject(txObject, {
            from: address,
            value: nft.mintFee,
            gasPrice,
          })
          const receipt = await tx.waitReceipt()
          console.log('receipt', receipt)
          logEvent(analytics, 'mint_succeeded', { name: nft.name })
        } catch (error) {
          logEvent(analytics, 'mint_failed', { name: nft.name })
          console.error(error)
        }
      })
    }
  }

  const mints = nfts.map((nft) => {
    return (
      <li key={nft.contractAddress}>
        {nft.name} <button onClick={makeMint(nft)}>Mint</button>
      </li>
    )
  })

  return (
    <div>
      <div>Connected to {address}</div>
      <button onClick={connect}>Connect wallet</button>
      <ul>{mints}</ul>
    </div>
  )
}

function WrappedApp() {
  return (
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
  )
}

export default WrappedApp
