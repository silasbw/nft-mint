import { Address } from '@celo/base/lib/address'
import { AbiItem, toWei } from 'web3-utils'

export interface NFT {
  name: string
  abi: AbiItem
  contractAddress: Address
  mintFee: string
}

export const nfts: NFT[] = [
  {
    name: 'Womxn of Celo',
    abi: require('./womxn-of-celo-abi.json'),
    contractAddress: '0x50826Faa5b20250250E09067e8dDb1AFa2bdf910',
    mintFee: toWei('2', 'ether'),
  },
]
