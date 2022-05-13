import React from 'react';
import Box from '@mui/material/Box';

import Header from '../Header';

interface AuthenticatedLayoutProps {
  children: React.ReactElement;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children,
}: AuthenticatedLayoutProps) => {
  return (
    <Box>
      <Header />
      <Box>{children}</Box>
    </Box>
  );
};

export default AuthenticatedLayout;
