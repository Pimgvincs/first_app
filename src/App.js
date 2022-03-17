
import './App.css';
import React, { useState } from 'react';
import Todo from './components/Todo';
import NavBar from './components/NavBar';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Calculator from './components/Calculator';
import About from './components/About';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <NavBar />



          <Switch>
            <Route path="/calculator" component={Calculator} exact>
              <Calculator/>
            </Route>
            <Route path="/about" component={About} exact>
              <About/>
            </Route>
            <Route path="/todo" component={Todo} exact>
              <Todo/>
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}


export default App;
