import { Box, IconButton } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import React from 'react'

type Props = {
  open: boolean,
  handleToggleDrawer: () => void,
}

const DrawToggle:React.FC<Props> = ({ open, handleToggleDrawer }) => {
  return (
    <Box
      sx={{
        height: '50px',
        display: 'flex',
        alignItems: 'right',
        justifyContent: 'right'
      }}
    >
      <IconButton onClick={handleToggleDrawer}>
        {open ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>
    </Box>
  )
}

export default DrawToggle