import React, { createContext, useState } from 'react';
import Alert, { AlertColor } from '@mui/material/Alert';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

import { getErrorMessage } from '../../../common/getErrorMessage';

export const UIContext = createContext<UIContextProps>({} as UIContextProps);

interface UIContextProps {
  setAlert: React.Dispatch<React.SetStateAction<AlertProps>>;
  showErrorAlert: (error: unknown) => void;
}

interface AlertProps {
  show: boolean;
  severity?: AlertColor;
  message?: string;
  simple?: boolean;
  position?: SnackbarOrigin;
}

export const UIContextProvider: React.FC = ({ children }) => {
  const [alert, setAlert] = useState<AlertProps>({
    show: false,
    simple: false,
    severity: 'info',
    message: '',
    position: { vertical: 'bottom', horizontal: 'left' },
  });

  const handleClose = () =>
    setAlert({
      show: false,
    });

  const showErrorAlert = (error: unknown) => {
    const errorMessage = getErrorMessage(error);
    setAlert({
      show: true,
      severity: 'error',
      message: errorMessage,
    });
  };

  return (
    <UIContext.Provider value={{ setAlert, showErrorAlert }}>
      {children}
      <Snackbar
        open={alert.show}
        autoHideDuration={4000}
        onClose={handleClose}
        message={alert.simple ? alert.message : null}
        anchorOrigin={alert.position}
      >
        {!alert.simple ? (
          <Alert elevation={6} variant="filled" severity={alert.severity}>
            {alert.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </UIContext.Provider>
  );
};
