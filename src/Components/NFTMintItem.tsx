import { useContractKit } from '@celo-tools/use-contractkit'
import { Button, Card, CardActions, CardHeader } from '@mui/material'
import { logEvent } from 'firebase/analytics'
import { useEffect, useState } from 'react'
import { analytics } from '../firebase'
import { NFTContract, NFTContractMetadata, nfts } from '../nfts'
import { mintFeeDisplay } from '../utils/utils'

function NFTMintItem({ nft }: { nft: NFTContract }) {
  const { address, getConnectedKit, initialised, performActions } =
    useContractKit()
  const [nftContractMetadata, setNFTContractMetadata] =
    useState<NFTContractMetadata | null>(null)

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
      console.log('metadata', metadata)
      setNFTContractMetadata(metadata)
    }
    fetch().catch(console.error)
    console.log('NFT: ', nfts)
  }, [])

  const showCount =
    nftContractMetadata?.maxSupply && nftContractMetadata?.totalSupply

  return (
    <Card sx={{ minHeight: 142 }}>
      <CardHeader
        title={nft.name}
        subheader={
          showCount
            ? `${nftContractMetadata.totalSupply} of ${nftContractMetadata.maxSupply} minted`
            : `unknown amount minted`
        }
      />
      <CardActions className="card-actions">
        <Button onClick={mint} variant="contained">
          Mint for {mintFeeDisplay(nft.mintFee)} CELO
        </Button>
      </CardActions>
    </Card>
  )
}

export default NFTMintItem
