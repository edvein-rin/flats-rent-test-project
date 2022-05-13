import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Theme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import UserProfileMenu from '../UserProfileMenu';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'fixed',
  },
  headerOffset: {
    minHeight: 64,
  },
  menuButton: {
    color: 'inherit',
    marginRight: theme.spacing(2),
  },
  spacer: {
    flexGrow: 1,
  },
}));

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
