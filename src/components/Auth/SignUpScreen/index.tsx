import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Logo from '../../Unknown/Logo';
import RegistrationForm from '../RegistrationForm';
import SideImage from '../SideImage';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexWrap: 'nowrap',
  },
  sideBlock: {
    height: '100%',
    [theme.breakpoints.up('xs')]: { display: 'none' },
    [theme.breakpoints.up('md')]: { display: 'block' },
    overflow: 'hidden',
  },
  main: {
    height: '100%',
    flexGrow: 1,
    [theme.breakpoints.up('xs')]: {
      padding: theme.spacing(2),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
    },
  },
  logoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(7),
  },
  formWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
  },
  underlay: {
    alignItems: 'center',
  },
  underlayTitle: {
    fontWeight: 600,
  },
}));

const SignUpScreen: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.sideBlock}>
        <SideImage />
      </Box>
      <Stack className={classes.main} spacing={4}>
        <Box className={classes.logoWrapper}>
          <Logo />
        </Box>
        <Box className={classes.formWrapper}>
          <RegistrationForm />
        </Box>
        <Stack className={classes.underlay}>
          <Typography className={classes.underlayTitle} variant="subtitle2">
            Already have an account?
          </Typography>
          <Button variant="text" href="/login">
            Login
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SignUpScreen;
