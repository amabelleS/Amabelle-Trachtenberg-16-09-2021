import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import ThemeProvider from './theme/ThemeProvidor';
import { Home, Favorites } from './pages';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/favorites" component={Favorites} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
