import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import { Bible } from 'containers/Bible'

export const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Bible Scripture</title>
      </Head>
      <Bible />
    </>
  )
}
