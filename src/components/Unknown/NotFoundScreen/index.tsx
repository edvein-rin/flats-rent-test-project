import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import useStyles from './useStyles';

const NotFoundScreen: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h1">Page not found</Typography>
    </Box>
  );
};

export default NotFoundScreen;
