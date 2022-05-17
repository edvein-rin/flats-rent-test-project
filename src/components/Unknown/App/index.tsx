import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import { FirebaseAppProvider } from 'reactfire';
import { LoadScript, LoadScriptProps } from '@react-google-maps/api';

import firebaseApp from '../../../common/firebaseApp';
import theme from '../../../common/theme';
import Root from '../Root';
import { UIContextProvider } from '../UIContext';

const App: React.FC = () => {
  if (!process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
    throw Error(
      'Environment variable REACT_APP_GOOGLE_MAPS_API_KEY is not set.',
    );
  }

  // Separated array due to:
  // Performance warning! LoadScript has been reloaded unintentionally!
  // You should not pass `libraries` prop as new array.
  const loadScriptLibraries: LoadScriptProps['libraries'] = ['places'];

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={loadScriptLibraries}
    >
      <FirebaseAppProvider firebaseApp={firebaseApp}>
        <ThemeProvider theme={theme}>
          <Router basename={process.env.PUBLIC_URL || '/'}>
            <CssBaseline />
            <UIContextProvider>
              <Root />
            </UIContextProvider>
          </Router>
        </ThemeProvider>
      </FirebaseAppProvider>
    </LoadScript>
  );
};

export default App;
