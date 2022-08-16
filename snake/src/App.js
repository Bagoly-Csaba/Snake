import React,{useState, useMemo} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Create from './pages/Create';
import Profile from './pages/Profile';
import {UserContext} from "./components/UserContext"
import {ChosenMap} from "./components/ChosenMap"
function App() {
  const [user, setUser] = useState(null);
  const providerValue = useMemo(() => ({user, setUser}),[user, setUser])
  const [chosenMap, setChosenMap] = useState(null);
  const providerMap = useMemo(() => ({chosenMap, setChosenMap}),[chosenMap, setChosenMap])
  return (
    <>
    <UserContext.Provider value={providerValue}>
          <ChosenMap.Provider value={providerMap}>
      <Router>
        <Navbar />
        <Switch>
          
          <Route path='/' exact component={Home} />
          <Route path='/Game' component={Game} />
          <Route path='/Create' component={Create} />
          <Route path='/Profile' component={Profile} />
          
        </Switch>
      </Router>
      </ChosenMap.Provider>
          </UserContext.Provider>
    </>
  );
}

export default App;
