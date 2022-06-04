import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { defaultTheme, darkTheme, GlobalStyle } from '../theme'

// Material UI
import 'muicss/dist/css/mui.min.css'

const App: NextPage<AppProps> = (props: AppProps) => {
  const { Component, pageProps } = props
  // TODO: get Light/Dark mode from state
  const isDarkMode = false

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={isDarkMode ? darkTheme : defaultTheme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default App
