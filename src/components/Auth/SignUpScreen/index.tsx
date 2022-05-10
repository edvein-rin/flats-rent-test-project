import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Logo from '../../Unknown/Logo';
import RegistrationForm from '../RegistrationForm';
import SideImage from '../SideImage';

const SignUpScreen: React.FC = () => {
  return (
    <Box height="100vh" display="flex" flexWrap="nowrap">
      <Box
        height="100%"
        display={{
          xs: 'none',
          md: 'block',
        }}
        sx={{
          overflow: 'hidden',
        }}
      >
        <SideImage />
      </Box>
      <Stack height="100%" flexGrow={1} spacing={4} p={{ xs: 2, md: 6 }}>
        <Box display="flex" justifyContent="center" alignItems="center" mt={7}>
          <Logo />
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="center">
          <RegistrationForm />
        </Box>
        <Stack alignItems="center">
          <Typography variant="subtitle2" fontWeight={600}>
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
