import React from 'react';
import {
  createTheme,
  ThemeProvider as Provider,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { purple } from '@material-ui/core/colors';

const ThemeProvider = ({ children }) => {
  const overrides = {
    MuiTab: {
      root: {
        backgroundColor: '#303030',
      },
    },
    // MuiAppBar: { colorPrimary: { backgroundColor: '#FFC0CB' } },
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        overrides,
        palette: {
          type: 'dark',
          primary: {
            main: '#84ffff',
          },
          secondary: {
            main: purple[400],
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

export default ThemeProvider;
