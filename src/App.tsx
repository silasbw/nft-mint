import { ContractKitProvider, Mainnet } from '@celo-tools/use-contractkit'
import '@celo-tools/use-contractkit/lib/styles.css'
import { Grid } from '@mui/material'
import './App.css'
import NFTMintItem from './Components/NFTMintItem'
import Header from './Header/Header'
import { nfts } from './nfts'

function App() {
  // We Might want to move this to a new component
  return (
    <Grid
      className="gridContainer"
      container
      spacing={4}
      style={{ paddingTop: 62 }}
    >
      {nfts.map((nft, idx) => (
        <Grid key={idx} xs={12} sm={12} md={6} lg={4} item>
          <NFTMintItem key={nft.contractAddress} nft={nft} />
        </Grid>
      ))}
    </Grid>
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
      <Header />
      <App />
    </ContractKitProvider>
  )
}

export default WrappedApp
