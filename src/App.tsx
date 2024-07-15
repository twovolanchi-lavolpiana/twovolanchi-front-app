import React, { useState } from 'react';
import './App.css';
import { Board } from './component/Board';
import Navbar from './component/Navbar';
import { Box, createTheme, CssBaseline, FormControlLabel, Grid, Switch, ThemeProvider } from '@mui/material';


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
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" flexDirection="column">
        <div className="App">
          <div className="App-container">
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid item xs={12}>
                <Navbar darkMode={darkMode} onThemeChange={handleThemeChange} />
              </Grid>
              <Grid item xs={12}>
                <Board />
              </Grid>
            </Grid>
          </div>
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default App;
