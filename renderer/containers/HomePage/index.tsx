import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import { AppBar } from 'components'

import { BibleView } from 'containers/BibleView'
import { SContainer, SContent } from './styled.index'
import useBase from './useBase'

export const HomePage: NextPage = () => {
  const { targetRef, dimensions } = useBase()

  return (
    <SContainer>
      <Head>
        <title>Bible Scripture</title>
      </Head>
      <AppBar></AppBar>
      <SContent ref={targetRef}>
        <BibleView dimensions={dimensions} />
      </SContent>
    </SContainer>
  )
}
