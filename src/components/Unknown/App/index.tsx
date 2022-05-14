import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import { FirebaseAppProvider } from 'reactfire';
import { LoadScript } from '@react-google-maps/api';

import firebaseApp from '../../../common/firebaseApp';
import theme from '../../../common/theme';
import Root from '../Root';
import { UIContextProvider } from '../UIContext';

const App: React.FC = () => {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCHLvl8KuMVe8Xpu0K8ZnKnk69e-lEHO1Q"
      libraries={['places']}
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
