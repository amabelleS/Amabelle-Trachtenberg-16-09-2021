import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all .5s linear;
    margin: 0;
    scroll-behavior: smooth;
    height: 100vh;
  }
`;

export const lightTheme = {
  body: '#bbe4e9',
  text: '#000000',
  primary: '#84ffff',
  secondary: '#018786',
  darkLight: '#84ffff',
};

export const darkTheme = {
  body: '#000000',
  text: '#84ffff',
  primary: '#000000',
  secondary: '#606470',
  darkLight: '#393e46',
};
