import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 320,
      sm: 420,
      md: 600,
      lg: 768,
      xl: 992,
    },
  },
});

export default theme;