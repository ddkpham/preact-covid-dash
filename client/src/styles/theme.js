import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Colours from: https://coolors.co/a76d60-76877d-197278-9df7e5-191919

const colours = {
  eerie_black: "#191919",
  bronze: "#A76D60",
  murkey_green: "#76877D",
  teal: "#197278",
  mint: "#9DF7E5",
  red: red[600],
  white: "#FFF",
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colours.teal,
    },
    secondary: {
      main: colours.bronze,
      light: colours.white,
    },
    text: {
      primary: colours.eerie_black,
      secondary: colours.murkey_green,
    },
    error: {
      main: colours.red,
      secondary: red[200],
    },
  },
  colours,
});

export default theme;
