import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { useDarkMode } from './styles/useDarkMode';
import { GlobalStyles, lightTheme, darkTheme } from './styles/globalStyles';
import { ThemeProvider } from 'styled-components';
import MuiThemeProvider from './theme/ThemeProvidor';
import { Provider } from 'react-redux';
import store from './store';

import { Home, Favorites } from './pages';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <Router>
      <MuiThemeProvider>
        <ThemeProvider theme={themeMode}>
          <GlobalStyles />
          <Provider store={store}>
            <Navbar darkTheme={theme} toggleTheme={toggleTheme} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/favorites" component={Favorites} />
              <Redirect to="/" />
            </Switch>
          </Provider>
        </ThemeProvider>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
