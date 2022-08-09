import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import { useState } from 'react';
import Nav from './components/Navigation'

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <Router>
        <div className="App-header">
        <header>
        <h1>Exercise Tracker</h1>
        <p>Full Stack MERN App Demonstration</p>
        </header>
        <br></br>
        <h2><Nav /></h2>
          <Route path="/" exact>
            <HomePage setExerciseToEdit={setExerciseToEdit}/>
          </Route>
          <Route path="/create-exercise">
            <CreateExercisePage />
          </Route>
          <Route path="/edit-exercise">
            <EditExercisePage exerciseToEdit={exerciseToEdit}/>
          </Route>
          <br></br>
          <br></br>
          <header>
            <footer>© 2022 Erwin Laird</footer>
          </header>
          </div>
      </Router>
    </div>
  );
}

export default App;