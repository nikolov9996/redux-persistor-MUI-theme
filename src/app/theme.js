import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiLink: {
      styleOverrides: {
        underlineAlways: false,
        underlineHover: false,
        root:{
            color:"GrayText"
        }
      },
    },
  },
  typography:{
      allVariants:{
          color:"#181818"
      }
  }
});
