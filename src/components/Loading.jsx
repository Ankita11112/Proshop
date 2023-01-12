import { Box, Stack } from '@mui/material'
import React from 'react'
import { HashLoader } from 'react-spinners'

const Loading = () => {
  return (
    <Box sx={{height: "80vh", display: "flex",justifyContent: "center", alignItems: "center"}}>
        <HashLoader size={80} color="#000000" />
    </Box>
  )
}

export default Loading