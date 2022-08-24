import { Box } from '@mui/system'
import React from 'react'

const TableLayout = ({children}) => {
  return (
    <Box sx={{ height: 670, width: "100%" }}>{children}</Box>
  )
}

export default TableLayout