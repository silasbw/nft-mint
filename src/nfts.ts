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
  {
    name: 'Celo Doodles',
    abi: require('./celo-doodles-abi.json'),
    contractAddress: '0xDAd48E7974878949f1672c92014Cc0615c79746f',
    mintFee: toWei('0', 'ether'),
  },
  {
    name: 'Celostrials',
    abi: require('./celostrials-abi.json'),
    contractAddress: '0xAc80c3c8b122DB4DcC3C351ca93aC7E0927C605d',
    mintFee: toWei('3', 'ether'),
  },
]
