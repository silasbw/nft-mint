import React, { useState, useEffect } from 'react'
import { logEvent } from 'firebase/analytics'
import { Address } from '@celo/base/lib/address'
import {
  useContractKit,
  Mainnet,
  ContractKitProvider,
} from '@celo-tools/use-contractkit'
import '@celo-tools/use-contractkit/lib/styles.css'

import { nfts, NFT, NFTMetadata } from './nfts'
import { analytics } from './firebase'

function NFTMintItem({ nft }: { nft: NFT }) {
  const { address, getConnectedKit, initialised, performActions } =
    useContractKit()
  const [nftMetadata, setNFTMetadata] = useState<NFTMetadata | null>(null)

  const mint = async () => {
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

  useEffect(() => {
    const fetch = async () => {
      const kit = await getConnectedKit()
      const contract = new kit.connection.web3.eth.Contract(
        nft.abi,
        nft.contractAddress,
      )
      const metadata = await nft.fetchMetadata(contract, nft.contractAddress)
      setNFTMetadata(metadata)
    }
    fetch().catch(console.error)
  }, [])

  const showCount = nftMetadata?.maxSupply && nftMetadata?.totalSupply

  return (
    <div>
      {nft.name}{' '}
      {showCount ? (
        <>
          {nftMetadata?.totalSupply} / {nftMetadata?.maxSupply}
        </>
      ) : null}{' '}
      <button onClick={mint}>Mint</button>
    </div>
  )
}

function App() {
  const { connect, address } = useContractKit()

  const [nftMetadata, setNFTMetadata] = useState<Record<string, NFTMetadata>>(
    {},
  )

  return (
    <div>
      <div>Connected to {address}</div>
      <button onClick={connect}>Connect wallet</button>
      <ul>
        {nfts.map((nft) => (
          <li key={nft.contractAddress}>
            <NFTMintItem nft={nft} />
          </li>
        ))}
      </ul>
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
