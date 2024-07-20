import './config/i18n';
import React, { useEffect, useState } from 'react';
import './App.css';
import { Alert, Box, createTheme, CssBaseline, Snackbar, ThemeProvider } from '@mui/material';
import { ScreenSizeProvider } from './provider/ScreenSizeProvider';
import { Route, Routes } from 'react-router-dom';
import SharePage from './component/share/SharePage';
import MainPage from './component/MainPage';
import EditPage from './component/edit/EditPage';
import IntroducePage from './component/introduce/IntroducePage';
import GuidePage from './component/introduce/GuidePage';
import Footer from './component/footer/Footer';
import { useTranslation } from 'react-i18next';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { t } = useTranslation();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    setOpenSnackbar(true);
  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <ScreenSizeProvider>
        <Routes>
          <Route
            key={'default'}
            path={''}
            element={<MainPage darkMode={darkMode} onThemeChange={handleThemeChange} />}
          />
          <Route
            key={'home'}
            path={'/'}
            element={<MainPage darkMode={darkMode} onThemeChange={handleThemeChange} />}
          />
          <Route
            key={'edit'}
            path={'/edit/:editKey'}
            element={<EditPage darkMode={darkMode} onThemeChange={handleThemeChange} />}
          />
          <Route
            key={'share'}
            path={'/:shareKey'}
            element={<SharePage darkMode={darkMode} onThemeChange={handleThemeChange} />}
          />
          <Route
            key={'introduce'}
            path={'/introduce'}
            element={<IntroducePage darkMode={darkMode} onThemeChange={handleThemeChange} />}
          />
          <Route
            key={'guide'}
            path={'/guide'}
            element={<GuidePage darkMode={darkMode} onThemeChange={handleThemeChange} />}
          />
        </Routes>
        <Footer />

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
            {t('Mobile Snack Bar')}
          </Alert>
        </Snackbar>

      </ScreenSizeProvider>
    </ThemeProvider>
  );
}

export default App;
