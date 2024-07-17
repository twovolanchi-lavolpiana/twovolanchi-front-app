import React, { useState } from 'react';
import './App.css';
import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { ScreenSizeProvider } from './provider/ScreenSizeProvider';
import { Route, Routes } from 'react-router-dom';
import ShareComponent from './component/ShareComponent';
import MainComponent from './component/MainComponent';
import EditComponent from './component/EditComponent';

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
            element={<MainComponent darkMode={darkMode} onThemeChange={handleThemeChange} />}
          />
          <Route
            key={'home'}
            path={'/'}
            element={<MainComponent darkMode={darkMode} onThemeChange={handleThemeChange} />}
          />
          <Route
            key={'edit'}
            path={'/edit/:editKey'}
            element={<EditComponent darkMode={darkMode} onThemeChange={handleThemeChange} />}
          />
          <Route
            key={'share'}
            path={'/:shareKey'}
            element={<ShareComponent darkMode={darkMode} onThemeChange={handleThemeChange} />}
          />
        </Routes>
      </ScreenSizeProvider>
    </ThemeProvider>
  );
}

export default App;
