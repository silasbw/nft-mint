import type { ContractKit } from '@celo/contractkit'
import { CeloTxObject } from '@celo/connect'
import { Address } from '@celo/base/lib/address'
import { AbiItem, toWei } from 'web3-utils'
import { Contract } from 'web3-eth-contract'

export interface NFTContract {
  name: string
  abi: AbiItem
  contractAddress: Address
  mintFee: string
  makeMintTransaction(
    contract: Contract,
    address: Address,
  ): Promise<CeloTxObject<any>>
  fetchMetadata(contract: Contract, address: Address): Promise<NFTContractMetadata>
}

export interface NFTContractMetadata {
  contractAddress: Address
  name?: string
  owner?: Address
  maxSupply?: string
  totalSupply?: string
}

function defaultMakeMintTransaction(
  contract: Contract,
  address: Address,
): Promise<CeloTxObject<any>> {
  return contract.methods.mint(1)
}

async function defaultFetchMetadata(
  contract: Contract,
  address: Address,
): Promise<NFTContractMetadata> {
  const metadata : NFTContractMetadata = {contractAddress: address}

  metadata.contractAddress = address
  if (contract.methods.maxSupply) {
    metadata.maxSupply = await contract.methods.maxSupply().call()
  }
  if (contract.methods.totalSupply) {
    metadata.totalSupply = await contract.methods.totalSupply().call()
  }
  if (contract.methods.name) {
    metadata.name = await contract.methods.name().call()
  }
  if (contract.methods.owner) {
    metadata.owner = await contract.methods.owner().call()
  }
  return metadata
}

export const nfts: NFTContract[] = [
  {
    name: 'Womxn of Celo',
    abi: require('./abis/womxn-of-celo.json'),
    contractAddress: '0x50826Faa5b20250250E09067e8dDb1AFa2bdf910',
    mintFee: toWei('2', 'ether'),
    makeMintTransaction: defaultMakeMintTransaction,
    fetchMetadata: defaultFetchMetadata,
  },
  {
    name: 'Celo Doodles',
    abi: require('./abis/celo-doodles.json'),
    contractAddress: '0xDAd48E7974878949f1672c92014Cc0615c79746f',
    mintFee: toWei('0', 'ether'),
    makeMintTransaction: defaultMakeMintTransaction,
    fetchMetadata: defaultFetchMetadata,
  },
  {
    name: 'Celostrials',
    abi: require('./abis/celostrials.json'),
    contractAddress: '0xAc80c3c8b122DB4DcC3C351ca93aC7E0927C605d',
    mintFee: toWei('3', 'ether'),
    makeMintTransaction: (
      contract: Contract,
      address: Address,
    ): Promise<CeloTxObject<any>> => {
      return contract.methods.mint(address, 1)
    },
    fetchMetadata: defaultFetchMetadata,
  },
]
