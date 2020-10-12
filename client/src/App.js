import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import Home from './routes/Home';
import UpdatePage from './routes/UpdatePage';
import RestaurantDetailPage from './routes/RestaurantDetailPage';
import { RestaurantContextProvider } from './context/RestaurantsContext';

function App() {
  return (
    <RestaurantContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component = {Home}/>
          <Route exact path="/restaurants/:id/update" component = {UpdatePage}/>
          <Route exact path="/restaurants/:id" component = {RestaurantDetailPage}/>
        </Switch>
      </Router>
    </RestaurantContextProvider>
  );
}

export default App;
