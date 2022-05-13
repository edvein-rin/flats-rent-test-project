import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    width: '100%',
  },
  flatsButtonWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(5),
  },
}));

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
