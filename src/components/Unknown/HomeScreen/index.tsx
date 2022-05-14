import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import useStyles from './useStyles';

const HomeScreen: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.flatsButtonWrapper}>
        <Button variant="contained" href="/flats">
          Explore flats
        </Button>
      </Box>
    </Box>
  );
};

export default HomeScreen;
