import './config/i18n';
import React, { useState } from 'react';
import './App.css';
import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { ScreenSizeProvider } from './provider/ScreenSizeProvider';
import { Route, Routes } from 'react-router-dom';
import SharePage from './component/share/SharePage';
import MainPage from './component/MainPage';
import EditPage from './component/edit/EditPage';
import IntroducePage from './component/introduce/IntroducePage';
import GuidePage from './component/introduce/GuidePage';

function App() {
  const [darkMode, setDarkMode] = useState(false);

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
      </ScreenSizeProvider>
    </ThemeProvider>
  );
}

export default App;
