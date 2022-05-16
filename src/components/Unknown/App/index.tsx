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
  // Separated array due to:
  // Performance warning! LoadScript has been reloaded unintentionally!
  // You should not pass `libraries` prop as new array.
  const loadScriptLibraries: LoadScriptProps['libraries'] = ['places'];

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCHLvl8KuMVe8Xpu0K8ZnKnk69e-lEHO1Q"
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
