import './App.css';
import React from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TabApp from './components/TabApp';


function App() {
  return (
    <div className="App">
      
      <AppBar position='static'>
        
        <Toolbar>
          <Typography variant='h6'>Gym</Typography>
        </Toolbar>
      </AppBar>
      <TabApp/>
      
      
    </div>
  );
}

export default App;
