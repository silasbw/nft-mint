import { useContractKit } from '@celo-tools/use-contractkit'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import MoneyIcon from '@mui/icons-material/Money'
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  List,
} from '@mui/material'
import { useState } from 'react'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { connect, address } = useContractKit()

  // Needed so we can cancel and reopen the modal
  const handleWalletConnect = async () => {
    try {
      await connect()
    } catch (e) {
      console.warn(e)
    }
  }

  const formatAddress = (address: string | null) => {
    if (address === null) {
      return null
    }
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Container
          disableGutters={true}
          maxWidth={false}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <IconButton
            size="large"
            aria-label="menu for nft mint"
            aria-controls="menu-appbar"
            aria-haspopup="menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <IconButton
            size="large"
            aria-label="connect wallet"
            aria-controls="connect-wallet-appbar"
            onClick={handleWalletConnect}
            disabled={menuOpen}
          >
            <Typography>{formatAddress(address)}</Typography>
            <AccountBalanceWalletIcon />
          </IconButton>
        </Container>
      </AppBar>
      <Drawer
        PaperProps={{
          sx: { width: 300 },
        }}
        sx={{
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { boxSizing: 'border-box' },
        }}
        open={Boolean(menuOpen)}
        onClose={() => setMenuOpen(!menuOpen)}
        id="appbar-drawer"
      >
        <Toolbar />
        <Box>
          <Typography align="center" variant="h3">
            NFT-Mint
          </Typography>
          <List>
            <ListItem button>
              <ListItemIcon>
                <MoneyIcon />
              </ListItemIcon>
              <ListItemText>Test List Item</ListItemText>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default Header
