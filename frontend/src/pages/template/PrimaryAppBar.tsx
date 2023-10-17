import { useEffect, useState } from 'react'
import { AppBar, Toolbar, Link, Typography, Box, IconButton, Drawer, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';
import MenuIcon from '@mui/icons-material/Menu';

const PrimaryAppBar = () => {
  const theme = useTheme()
  const [sideMenu, setSideMenu] = useState(false)
  const toggleDrawer = (open: boolean) => (event: React.MouseEvent | React.KeyboardEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return ;
    }
    setSideMenu(!open)
  }

  const isSmallScreen = useMediaQuery(theme.breakpoints.up('sm'))
  useEffect(() => {
    if (!isSmallScreen && sideMenu){
      setSideMenu(false)
    }
  
  }, [isSmallScreen])



  return (
    <AppBar
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 2,
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}>
      <Toolbar
        variant="dense"
        sx={{
          height: theme.primaryAppBar.height,
          minHeight: theme.primaryAppBar.height
        }} >

        {/* Drawer Toggler */}
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={toggleDrawer(sideMenu)}
            sx={{ mr: 1 }}>
            <MenuIcon />
          </IconButton>
        </Box>

        <Drawer anchor='left' open={sideMenu} onClose={toggleDrawer(sideMenu)}>
          {[...Array(100)].map((_, i) => (
            <Typography key={i} paragraph>
              {i + 1}
            </Typography>
          ))}
        </Drawer>

        <Link href='/' underline='none' color='inherit'>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ display: { fontWeight: 600 } }}>
            DJCHAT
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default PrimaryAppBar