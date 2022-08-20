import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1A3CAA"
    }
  },
  components: {
    MuiLink: {
      styleOverrides: {
        underlineAlways: false,
        underlineHover: false,
        root: {
          color: "GrayText"
        }
      },
    },
    MuiButton: {
      styleOverrides: {

        sizeSmall: {
          padding: 3,
          textTransform: "none"
        },
        contained: {
          boxShadow: "none",
          borderRadius: 4
        }
      }
    }
  },
  typography: {
    allVariants: {
      color: "#181818"
    }
  }
});
