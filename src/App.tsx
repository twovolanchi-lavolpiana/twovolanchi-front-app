import React from 'react';
import './App.css';
import { Board } from './component/Board';
import Navbar from './component/Navbar';
import { Grid } from '@mui/material';


function App() {
  return (
    <div className="App">
      <div className="App-container">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Navbar/>
          </Grid>
          <Grid item xs={12}>
            <Board />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
