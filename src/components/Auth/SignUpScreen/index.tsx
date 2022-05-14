import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Logo from '../../Unknown/Logo';
import RegistrationForm from '../RegistrationForm';
import SideImage from '../SideImage';

import useStyles from './useStyles';

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
