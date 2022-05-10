import React, { createContext, useEffect, useState } from 'react';
import Alert, { AlertColor } from '@mui/material/Alert';
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';

import { getErrorMessage } from '../../../common/getErrorMessage';

export const UIContext = createContext<UIContextProps>({} as UIContextProps);

interface UIContextProps {
  setAlert: React.Dispatch<React.SetStateAction<AlertProps>>;
  showErrorAlert: (error: unknown) => void;
  setSnackbar: (
    snackbarConstructor: (
      handleClose: () => void,
    ) => React.ReactElement<SnackbarProps>,
  ) => void;
}

interface AlertProps {
  show: boolean;
  severity?: AlertColor;
  message?: string;
}

export const UIContextProvider: React.FC = ({ children }) => {
  const [snackbarProps, setSnackbarProps] = useState<SnackbarProps>({
    open: false,
  });
  const onSnackbarClose = () => {
    setSnackbarProps({
      open: false,
    });
  };

  const [alert, setAlert] = useState<AlertProps>({
    show: false,
    severity: 'info',
    message: '',
  });

  const onAlertClose = () =>
    setAlert({
      show: false,
    });

  useEffect(() => {
    if (!alert.show) {
      setSnackbarProps({
        open: false,
      });
    } else {
      setSnackbarProps({
        open: alert.show,
        onClose: onAlertClose,
        children: (
          <Alert elevation={6} variant="filled" severity={alert.severity}>
            {alert.message}
          </Alert>
        ),
      });
    }
  }, [alert]);

  const setSnackbar = (
    snackbarConstructor: (
      handleClose: () => void,
    ) => React.ReactElement<SnackbarProps>,
  ) => {
    setSnackbarProps(snackbarConstructor(onSnackbarClose).props);
  };

  const showErrorAlert = (error: unknown) => {
    const errorMessage = getErrorMessage(error) ?? 'Unknown error.';
    setAlert({
      show: true,
      severity: 'error',
      message: errorMessage,
    });
  };

  return (
    <UIContext.Provider
      value={{
        setAlert,
        setSnackbar,
        showErrorAlert,
      }}
    >
      {children}
      <Snackbar autoHideDuration={4000} {...snackbarProps} />
    </UIContext.Provider>
  );
};
