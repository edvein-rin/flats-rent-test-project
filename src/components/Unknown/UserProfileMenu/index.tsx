import React, { useCallback, useContext, useState } from 'react';
import { useFirebaseApp } from 'reactfire';
import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { grey } from '@mui/material/colors';

import clearFirestoreCache from '../../../common/clearFirestoreCache';
import { UIContext } from '../UIContext';

const fullNameToInitials = (fullName: string): string => {
  const words = fullName.trim().split(' ');
  const initials = words.reduce((acc, currentWord, index) => {
    const isFirstWord = index === 0;
    const isLastWord = index === words.length - 1;
    if (isFirstWord || isLastWord) {
      return `${acc}${currentWord.charAt(0).toUpperCase()}`;
    }
    return acc;
  }, '');
  return initials;
};

const UserProfileMenu: React.FC = () => {
  const history = useHistory();
  const { setAlert } = useContext(UIContext);
  const auth = useFirebaseApp().auth();
  const { currentUser: user } = useFirebaseApp().auth();
  const { displayName: userFullName } = user || {};
  const userInitials = fullNameToInitials(userFullName || '');

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
    <div>
      <IconButton
        onClick={handleMenuClick}
        size="large"
        aria-label={`${userInitials} profile`}
        aria-controls="user-profile-menu"
        aria-haspopup="true"
        color="inherit"
      >
        <Avatar
          sx={{
            bgcolor: grey[400],
          }}
        >
          {userInitials || 'U'}
        </Avatar>
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
    </div>
  );
};

export default UserProfileMenu;
