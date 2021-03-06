import React from 'react';
import {
  createTheme,
  ThemeProvider as Provider,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const MuiThemeProvider = ({ children }) => {
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: 'dark',
          primary: {
            main: '#84ffff',
          },
          secondary: {
            light: '#0066ff',
            main: '#000000',
          },
          error: {
            main: '#f06292',
          },
        },
        components: {
          MuiAppBar: {
            defaultProps: {
              enableColorOnDark: true,
            },
          },
        },
      }),
    []
  );

  return (
    <Provider theme={theme}>
      <CssBaseline />
      {children}
    </Provider>
  );
};

export default MuiThemeProvider;
