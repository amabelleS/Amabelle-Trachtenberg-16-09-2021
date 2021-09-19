import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import ThemeProvider from './theme/ThemeProvidor';
import { FavoritesProvider } from './context/favorites';
import { Home, Favorites } from './pages';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <FavoritesProvider>
      <ThemeProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/favorites" component={Favorites} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </ThemeProvider>
    </FavoritesProvider>
  );
}

export default App;
