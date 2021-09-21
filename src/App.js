import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import ThemeProvider from './theme/ThemeProvidor';
import { Provider } from 'react-redux';
import store from './store';

import { FavoritesProvider } from './context/favorites';
import { Home, Favorites } from './pages';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <FavoritesProvider>
      <ThemeProvider>
        <Router>
          <Provider store={store}>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/favorites" component={Favorites} />
              <Redirect to="/" />
            </Switch>
          </Provider>
        </Router>
      </ThemeProvider>
    </FavoritesProvider>
  );
}

export default App;
