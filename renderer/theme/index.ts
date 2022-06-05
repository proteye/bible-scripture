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
