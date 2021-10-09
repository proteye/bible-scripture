import React, { Fragment } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import { Bible } from 'containers/Bible'

export const HomePage: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Bible Scripture</title>
      </Head>
      <Bible />
    </Fragment>
  )
}
