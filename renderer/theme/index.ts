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
  fonts: ['Roboto', 'Helvetica Neue', 'Helvetica', 'sans-serif'],
  fontSizes: {
    small: '1em',
    medium: '2em',
    large: '3em',
  },
}

export const defaultTheme = {
  ...commonTheme,
  palette: {
    primary: '#0a0a0a',
    secondary: '#58a6ff',
    error: '#ef5350',
    grey: '#9e9e9e',
    background: '#ffffff',
  },
}

export const darkTheme = {
  ...commonTheme,
  palette: {
    primary: '#c9d1d9',
    secondary: '#58a6ff',
    error: '#ef5350',
    background: '#0d1117',
  },
}