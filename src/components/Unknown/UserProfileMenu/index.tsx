import React, { useCallback, useContext, useState } from 'react';
import { useAuth } from 'reactfire';
import { useHistory } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import { Theme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { fullNameToInitials } from '../../../common/fullNameToInitials';
import clearFirestoreCache from '../../../common/clearFirestoreCache';
import { UIContext } from '../UIContext';

const useStyles = makeStyles((theme: Theme) => ({
  profileButton: {
    color: 'inherit',
  },
  avatar: {
    backgroundColor: theme.palette.grey[400],
  },
}));

const UserProfileMenu: React.FC = () => {
  const classes = useStyles();

  const history = useHistory();
  const { setAlert } = useContext(UIContext);
  const auth = useAuth();
  const { currentUser: user } = auth;
  const { displayName: userFullName } = user || {};
  const userInitials = fullNameToInitials(userFullName ?? '');

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
    null,
  );
  const isMenuOpen = !!menuAnchorEl;
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setMenuAnchorEl(null);
  };

  const onLogoutButtonClick = useCallback(() => {
    setIsLoggingOut(true);
    closeMenu();
    auth
      .signOut()
      .then(() => {
        clearFirestoreCache();
        history.push('/login');
      })
      .catch((error) => {
        setAlert({
          show: true,
          severity: 'error',
          message: error.message,
        });
      })
      .finally(() => {
        setIsLoggingOut(false);
      });
  }, [history, setAlert, auth, setIsLoggingOut]);

  if (!user) return null;

  return (
    <Box>
      <IconButton
        className={classes.profileButton}
        onClick={handleMenuClick}
        size="large"
        aria-label={`${userInitials} profile`}
        aria-controls="user-profile-menu"
        aria-haspopup="true"
      >
        <Avatar className={classes.avatar}>{userInitials || 'U'}</Avatar>
      </IconButton>
      <Menu
        id="user-profile-menu"
        anchorEl={menuAnchorEl}
        keepMounted
        open={isMenuOpen}
        onClose={closeMenu}
      >
        <MenuItem onClick={onLogoutButtonClick} disabled={isLoggingOut}>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserProfileMenu;
