import React from 'react';
import Box from '@mui/material/Box';
import Logo from '../../Unknown/Logo';
import LoginForm from '../LoginForm';
import sideImageSrc from './side-image.png';
import sideImageSrc2x from './side-image@2x.png';
import sideImageSrc3x from './side-image@3x.png';

const SignInScreen: React.FC = () => {
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
        <Box
          component="img"
          sx={{
            objectFit: 'cover',
          }}
          alt="An office building"
          srcSet={`${sideImageSrc} ${sideImageSrc2x} 2x ${sideImageSrc3x} 3x`}
          src={sideImageSrc}
          height="100%"
          width="100%"
        />
      </Box>
      <Box
        height="100%"
        flexGrow={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={{ xs: 2, md: 4 }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={{ xs: 4, md: '100px' }}
          mb={{ xs: 8, md: '38px' }}
        >
          <Logo />
        </Box>
        <LoginForm />
      </Box>
    </Box>
  );
};

export default SignInScreen;
