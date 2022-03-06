
import './App.css';
import React, { useState } from 'react';
import Todo from './components/Todo';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import MenuBar from "./components/nav/MenuBar";


function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Router>
            <MenuBar>
              <Routes>
                <Route path={'/components/Todo'} element={Todo} />
              </Routes>
            </MenuBar>  
          </Router>
      </header>
    </div>
  );
}


export default App;
