import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import Board from './components/Board';
import Join from './components/Join';

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Join}/>
      <Route path="/board" component={Board}/>
    </Router>
  );
}

export default App;
