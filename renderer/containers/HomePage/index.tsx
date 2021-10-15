import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import AppBar from 'components/AppBar'
import Button from 'components/Button'

import { Bible } from 'containers/Bible'

export const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Bible Scripture</title>
      </Head>
      <AppBar>AppBar</AppBar>
      <Button color="primary">Press It</Button>
      <Bible />
    </>
  )
}
