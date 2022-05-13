import React from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import { createTheme } from '@mui/material';
import { LinkProps } from '@mui/material/Link';
import { alpha } from '@mui/material/styles';

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>(({ href, ...other }, ref) => <RouterLink ref={ref} to={href} {...other} />);

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#f50057',
    },
  },
  typography: {
    h3: {
      fontSize: 40,
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
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
