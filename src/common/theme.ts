import { createTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#f50057',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'filled',
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          '&::before': {
            display: 'none',
          },
          '&::after': {
            display: 'none',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: alpha('#000', 0.6),
          },
        },
      },
    },
  },
});

export default defaultTheme;
