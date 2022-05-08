import React from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Logo from '../../Unknown/Logo';
import LoginForm from '../LoginForm';
import RegistrationForm from '../RegistrationForm';
import sideImageSrc from './side-image.png';
import sideImageSrc2x from './side-image@2x.png';
import sideImageSrc3x from './side-image@3x.png';

export interface Props {
  type: 'login' | 'registration';
}

interface UnderlayProps {
  title: string;
  buttonText: string;
  onButtonClick: React.MouseEventHandler<HTMLButtonElement>;
}
const Underlay: React.FC<UnderlayProps> = ({
  title,
  buttonText,
  onButtonClick,
}) => (
  <Stack alignItems="center">
    <Typography variant="subtitle2" fontWeight={600}>
      {title}
    </Typography>
    <Button variant="text" onClick={onButtonClick}>
      {buttonText}
    </Button>
  </Stack>
);

const AuthScreen: React.FC<Props> = ({ type }) => {
  const history = useHistory();

  const form = type === 'login' ? <LoginForm /> : <RegistrationForm />;
  const underlayTitle =
    type === 'login' ? "Don't have an account?" : 'Already have an account?';
  const underlayButtonText = type === 'login' ? 'Register' : 'Login';
  const onUnderlayButtonClick = () => {
    history.push(type === 'login' ? '/registration' : '/login');
  };

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
      <Stack height="100%" flexGrow={1} spacing={4} p={{ xs: 2, md: 6 }}>
        <Box display="flex" justifyContent="center" alignItems="center" mt={7}>
          <Logo />
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="center">
          {form}
        </Box>
        <Underlay
          title={underlayTitle}
          buttonText={underlayButtonText}
          onButtonClick={onUnderlayButtonClick}
        />
      </Stack>
    </Box>
  );
};

export default AuthScreen;
