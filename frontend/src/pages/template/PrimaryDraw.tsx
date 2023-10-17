import { Drawer, Box, useMediaQuery, Typography, styled } from '@mui/material'
import { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import DrawToggle from '../../components/PrimaryDraw/DrawToggle'

const PrimaryDraw = (event: React.MouseEvent) => {
  const theme = useTheme()
  const below600 = useMediaQuery('(max-width:599px)')
  const [open, setOpen] = useState(true)


  const openedMixin = () => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shortest,
    }),
    overflowX: 'hidden'
  })
  const closedMixin = () => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    width: theme.primaryDraw.closed
  })

  const Drawer = styled(MuiDrawer, {})(({ theme, open }) => ({
    width: theme.primaryDraw.width,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(),
      '& .MuiDrawer-paper': openedMixin()
    }),
    ...(!open && {
      ...openedMixin(),
      '& .MuiDrawer-paper': closedMixin()
    }),

  }))



  useEffect(() => {
    setOpen(!below600)
  }, [below600])

  const handleToggleDrawer = () => {
    setOpen(!open)
  }


  return (
    // change temporory to permanent to toggel the width of drawer to min size when the screen width reduces
    <Drawer open={open} variant={below600 ? 'temporory' : 'permanent'}
      PaperProps={{
        sx: {
          mt: `${theme.primaryAppBar.height}px`,
          height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
          width: open ? `${theme.primaryDraw.width}px` : `${theme.primaryDraw.closed}px`,
          width: `${theme.primaryDraw.width}px`,
          p: '10px',
        }
      }}
    >
      <Box>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            p: 0,
            width: open ? 'auto' : '100%',
          }}
        >
          <DrawToggle open={open} handleToggleDrawer={handleToggleDrawer} />
          {[...Array(50)].map((_, i) => (
            <Typography key={i} paragraph>
              {i + 1}
            </Typography>
          ))}
        </Box>
      </Box>
    </Drawer >
  )
}

export default PrimaryDraw