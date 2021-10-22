import { createGlobalStyle } from 'styled-components'
import fonts from './fonts'

export const GlobalStyle = createGlobalStyle`
  ${fonts}

  body {
    position: relative;
    background-color: ${({ theme }) => theme.palette.background};
    color: ${({ theme }) => theme.palette.primary};
    font-family: ${({ theme }) => theme.fonts.join(',')};
    font-size: 16px;
    line-height: 1.429;
    font-weight: normal;
    height:  100vh;
    margin: 0;
    padding: 0;
    overflow-y: hidden;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: ${({ theme }) => theme.fonts.join(',')};
  }

  div {
    box-sizing: border-box;
  }
`

export const commonTheme = {
  appBar: {
    height: '64px',
  },
  tabBar: {
    height: '34px',
  },
  searchBar: {
    height: '40px',
  },
  instantView: {
    height: '200px',
  },
  fonts: ['Roboto', 'Helvetica Neue', 'Helvetica', 'sans-serif'],
  fontSizes: {
    extraSmall: '0.625em',
    small: '0.875em',
    normal: '1em',
    medium: '2em',
    large: '3em',
    extraLarge: '4em',
  },
}

export const defaultTheme = {
  ...commonTheme,
  palette: {
    primary: '#0a0a0a',
    secondary: '#58a6ff',
    error: '#ef5350',
    gray: '#9e9e9e',
    background: '#ffffff',
  },
}

export const darkTheme = {
  ...commonTheme,
  palette: {
    primary: '#c9d1d9',
    secondary: '#58a6ff',
    error: '#ef5350',
    gray: '#9e9e9e',
    background: '#0d1117',
  },
}
