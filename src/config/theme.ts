import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: "light",
  },
  typography: {
    fontFamily: "Poppins",
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
});

theme.overrides = {
  MuiCardHeader: {
    title: {
      fontSize: '16px',
    },
    subheader: {
      fontSize: '15px',
    },
  },
};

export default theme