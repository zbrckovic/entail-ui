import React from 'react'
import { Box, Card } from 'rebass'

export const Modal = ({ isOpen, children, sx, ...props }) =>
  <Box
    sx={{
      display: isOpen ? 'flex' : 'none',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'auto',
      bg: 'modalOverlay'
    }}
  >
    <Card
      sx={{
        bg: 'background',
        ...sx
      }}
      {...props}
    >
      {children}
    </Card>
  </Box>
