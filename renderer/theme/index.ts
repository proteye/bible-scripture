import { createGlobalStyle } from 'styled-components'
import fonts from './fonts'

export const GlobalStyle = createGlobalStyle`
  ${fonts}

  body {
    position: relative;
    background-color: ${({ theme }) => theme.palette.background.default};
    color: ${({ theme }) => theme.palette.primary.main};
    font-family: 'Roboto', 'Helvetica Neue', Helvetica, sans-serif;
    font-weight: normal;
    margin: 0;
    padding: 0;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: 'Roboto', 'Helvetica Neue', Helvetica, sans-serif;
  }
`

export const defaultTheme = {
  palette: {
    primary: {
      main: '#0A0A0A',
    },
    secondary: {
      main: '#58A6FF',
    },
    error: {
      main: '#EF5350',
    },
    background: {
      default: '#FFFFFF',
    },
  },
}

export const darkTheme = {
  palette: {
    primary: {
      main: '#C9D1D9',
    },
    secondary: {
      main: '#58A6FF',
    },
    error: {
      main: '#EF5350',
    },
    background: {
      default: '#0D1117',
    },
  },
}
