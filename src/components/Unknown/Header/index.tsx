import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import UserProfileMenu from '../UserProfileMenu';

import useStyles from './useStyles';

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.root}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            size="large"
            edge="start"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.spacer} variant="h6" component="div">
            Voypost
          </Typography>
          <UserProfileMenu />
        </Toolbar>
      </AppBar>
      <Box className={classes.headerOffset} />
    </>
  );
};

export default Header;
